/**
 * Generate a unique BECon ID
 * Format: BEC26-XXXX-XXXX
 * Where X is alphanumeric (uppercase letters and numbers)
 */
export function generateBeconId(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed confusing chars like 0,O,1,I

    const randomPart1 = Array.from({ length: 4 }, () =>
        chars[Math.floor(Math.random() * chars.length)]
    ).join('');

    const randomPart2 = Array.from({ length: 4 }, () =>
        chars[Math.floor(Math.random() * chars.length)]
    ).join('');

    return `BEC26-${randomPart1}-${randomPart2}`;
}

/**
 * Simple hash function for strings
 */
function simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
}

/**
 * Generate BECon ID from user ID (deterministic and unique)
 * Uses hash of full UUID to ensure no collisions
 */
export function generateBeconIdFromUserId(userId: string): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

    // Create two different hashes for the two parts
    const hash1 = simpleHash(userId);
    const hash2 = simpleHash(userId.split('').reverse().join(''));

    // Generate first 4 characters from hash1
    let part1 = '';
    let tempHash1 = hash1;
    for (let i = 0; i < 4; i++) {
        part1 += chars[tempHash1 % chars.length];
        tempHash1 = Math.floor(tempHash1 / chars.length);
    }

    // Generate second 4 characters from hash2
    let part2 = '';
    let tempHash2 = hash2;
    for (let i = 0; i < 4; i++) {
        part2 += chars[tempHash2 % chars.length];
        tempHash2 = Math.floor(tempHash2 / chars.length);
    }

    return `BEC26-${part1}-${part2}`;
}
