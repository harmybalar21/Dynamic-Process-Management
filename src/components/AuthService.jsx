
class AuthService {
    async signup(req) {
      try {
        const response = await fetch('http://10.100.111.99:8080/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(req),
        });
  
        if (!response.ok) {
          throw new Error('Signup failed');
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error during signup:', error.message);
        throw error;
      }
    }
    async signin(details) {
        try {
          const response = await fetch('http://10.100.111.99:8080/api/auth/signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(details),
          });
    
          if (!response.ok) {
            throw new Error('Signin failed');
          }
    
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error during signin:', error.message);
          throw error;
        }
      }
  }
  
  
  export default new AuthService();
  