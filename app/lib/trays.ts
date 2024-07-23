export const connectMongoDB = async (): Promise<string> => {
    try {
      const response = await fetch('/api/connect');
      const data = await response.json();
      return data.message || data.error
    } catch (error) {
      return 'Connect failed'
    }
  }

export const fetchTrays = async (): Promise<ITray[]> => {
    try {
      const response = await fetch('/api/trays');
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Failed to fetch trays:', error);
      return [];
    }
  }