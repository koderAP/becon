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
 * Generate BECon ID from user ID (deterministic)
 * This ensures same user always gets same ID
 */
export function generateBeconIdFromUserId(userId: string): string {
    // Use first 8 chars of user ID to create deterministic ID
    const hash = userId.replace(/-/g, '').toUpperCase();
    const part1 = hash.substring(0, 4);
    const part2 = hash.substring(4, 8);

    return `BEC26-${part1}-${part2}`;
}
