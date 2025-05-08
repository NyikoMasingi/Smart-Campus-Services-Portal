



export const generateIdNumber = function (): string {
    const timestamp = Date.now().toString();
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `SN${timestamp}${randomNum}`;
 }