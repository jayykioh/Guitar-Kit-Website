'use server';

export async function logToTerminal(message: string, data?: any) {
    const timestamp = new Date().toLocaleTimeString();
    if (data) {
        console.log(`[CLIENT-LOG ${timestamp}] ${message}`, data);
    } else {
        console.log(`[CLIENT-LOG ${timestamp}] ${message}`);
    }
}
