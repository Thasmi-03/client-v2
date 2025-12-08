import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const aiService = {
    getSuggestions: async (skinTone: string) => {
        const token = Cookies.get('token');
        const response = await axios.post(
            `${API_URL}/ai/suggestions`,
            { skinTone },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    },

    detectSkinTone: async (imageUrl: string) => {
        const token = Cookies.get('token');
        try {
            const response = await axios.post(
                `${API_URL}/ai/detect-skin-tone`,
                { imageUrl },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            // Enhanced error logging to capture backend error details
            console.error('❌ Skin Tone Detection Error Details:');
            console.error('Status:', error.response?.status);
            console.error('Error Message:', error.response?.data?.message);
            console.error('Error Hint:', error.response?.data?.hint);
            console.error('Error Type:', error.response?.data?.type);
            console.error('Full Error Response:', error.response?.data);

            // Create a detailed error message
            const errorMsg = error.response?.data?.message || 'Failed to detect skin tone';
            const errorHint = error.response?.data?.hint;
            const fullMessage = errorHint ? `${errorMsg}\n${errorHint}` : errorMsg;

            // Throw error with detailed message
            const detailedError = new Error(fullMessage);
            (detailedError as any).serverError = error.response?.data;
            throw detailedError;
        }
    },
};
