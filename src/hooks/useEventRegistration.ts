import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

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
    const { user } = useAuth();
    const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState<string | null>(null);

    // Fetch user's registrations
    const fetchRegistrations = useCallback(async () => {
        if (!user) {
            setRegistrations([]);
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('event_registrations')
                .select('id, event_id, status, source, registered_at')
                .eq('user_id', user.id);

            if (error) throw error;
            setRegistrations(data || []);
        } catch (err) {
            console.error('Failed to fetch registrations:', err);
        } finally {
            setLoading(false);
        }
    }, [user]);

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

    // Register for an internal event
    const registerForEvent = async (eventId: string) => {
        if (!user) {
            toast.error('Please login to register for events');
            return false;
        }

        if (isRegistered(eventId)) {
            toast.info('You are already registered for this event');
            return false;
        }

        setRegistering(eventId);
        try {
            const { error } = await supabase
                .from('event_registrations')
                .insert({
                    user_id: user.id,
                    event_id: eventId,
                    source: 'internal',
                    status: 'registered'
                });

            if (error) throw error;

            toast.success('Successfully registered!');
            await fetchRegistrations();
            return true;
        } catch (err: any) {
            console.error('Registration failed:', err);
            if (err.code === '23505') {
                toast.info('You are already registered for this event');
            } else {
                toast.error('Registration failed. Please try again.');
            }
            return false;
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
        refetch: fetchRegistrations,
        registrationCount: registrations.length
    };
}
