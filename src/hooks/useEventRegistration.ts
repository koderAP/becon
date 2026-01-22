import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { apiRequest } from '../lib/api';

interface EventRegistration {
    id: string;
    event_id: string;
    status: string;
    source: string;
    registered_at: string;
}

interface EventInfo {
    id: string;
    name: string;
    event_date: string;
    venue: string;
    category: string;
    registration_type: 'internal' | 'unstop';
    unstop_url: string | null;
}

export function useEventRegistration() {
    const { user, session } = useAuth();
    const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState<string | null>(null);
    const [userPass, setUserPass] = useState<string | null>(null);

    // Fetch user's registrations from both tables
    const fetchRegistrations = useCallback(async () => {
        if (!user) {
            setRegistrations([]);
            setLoading(false);
            return;
        }

        try {
            // Fetch Registrations via Backend API (Bypasses RLS)
            // PASS SESSION TOKEN
            const token = session?.access_token;
            const { registrations: fetchedRegistrations } = await apiRequest('/api/events/registrations', 'GET', undefined, token);

            setRegistrations(fetchedRegistrations || []);

            // Fetch User Pass
            const { data: passData } = await supabase
                .from('user_passes')
                .select('pass_type')
                .eq('user_id', user.id)
                .order('purchased_at', { ascending: false })
                .limit(1)
                .single();

            setUserPass(passData?.pass_type || null);
        } catch (err) {
            console.error('Failed to fetch registrations:', err);
        } finally {
            setLoading(false);
        }
    }, [user, session]);

    useEffect(() => {
        fetchRegistrations();
    }, [fetchRegistrations]);

    // Check if user is registered for an event
    const isRegistered = useCallback((eventId: string) => {
        return registrations.some(r => r.event_id === eventId);
    }, [registrations]);

    // Get registration for an event
    const getRegistration = useCallback((eventId: string) => {
        return registrations.find(r => r.event_id === eventId);
    }, [registrations]);

    // Register for an event (Internal or Dynamic)
    const registerForEvent = async (eventId: string, options: { silent?: boolean, isDynamic?: boolean, formData?: any } = {}) => {
        if (!user) {
            if (!options.silent) toast.error('Please login to register for events');
            return { success: false, message: 'Please login to register', type: 'auth_required' };
        }

        if (isRegistered(eventId)) {
            if (!options.silent) toast.info('You are already registered for this event');
            return { success: false, message: 'Already registered', type: 'already_registered' };
        }

        setRegistering(eventId);
        try {
            // 2. Register via Backend API (Bypasses RLS)
            const token = session?.access_token;
            await apiRequest('/api/events/register', 'POST', {
                eventId,
                isDynamic: options.isDynamic,
                formData: options.formData
            }, token);

            if (!options.silent) toast.success('Successfully registered!');
            await fetchRegistrations();
            return { success: true, message: 'Successfully registered!', type: 'success' };
        } catch (err: any) {
            console.error('Registration failed:', err);

            // Handle specific API error responses if apiRequest throws with response data
            // Assuming apiRequest throws an error with message property
            const msg = err.message || 'Registration failed';

            if (msg.includes('Already registered') || err.message?.includes('409')) {
                if (!options.silent) toast.info('You are already registered for this event');
                await fetchRegistrations(); // Sync state with backend
                return { success: false, message: 'Already registered', type: 'already_registered' };
            }

            if (!options.silent) toast.error(msg);
            return { success: false, message: msg, type: 'error' };
        } finally {
            setRegistering(null);
        }
    };

    // Mark as registered for Unstop events
    const markAsRegistered = async (eventId: string) => {
        if (!user) {
            toast.error('Please login first');
            return false;
        }

        setRegistering(eventId);
        try {
            const { error } = await supabase
                .from('event_registrations')
                .upsert({
                    user_id: user.id,
                    event_id: eventId,
                    source: 'unstop',
                    status: 'registered'
                }, { onConflict: 'user_id,event_id' });

            if (error) throw error;

            toast.success('Registration marked!');
            await fetchRegistrations();
            return true;
        } catch (err) {
            console.error('Mark registration failed:', err);
            toast.error('Failed to mark registration');
            return false;
        } finally {
            setRegistering(null);
        }
    };

    // Cancel registration
    const cancelRegistration = async (eventId: string) => {
        const registration = getRegistration(eventId);
        if (!registration) return false;

        try {
            const { error } = await supabase
                .from('event_registrations')
                .delete()
                .eq('id', registration.id);

            if (error) throw error;

            toast.success('Registration cancelled');
            await fetchRegistrations();
            return true;
        } catch (err) {
            console.error('Cancel failed:', err);
            toast.error('Failed to cancel registration');
            return false;
        }
    };

    return {
        registrations,
        loading,
        registering,
        isRegistered,
        getRegistration,
        registerForEvent,
        markAsRegistered,
        cancelRegistration,
        fetchRegistrations, // Expose for manual refresh (e.g., after popup form)
        registrationCount: registrations.length,
        userPass // userPass is already the string value (pass_type)
    };
}
