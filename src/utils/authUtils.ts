
// Google OAuth configuration
// Replace this with your actual Google OAuth client ID when deploying
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"; 

// Function to initialize Google OAuth
export const initGoogleAuth = (): Promise<google.accounts.id.IdConfiguration> => {
  return new Promise((resolve, reject) => {
    // Load the Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gjs/id';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      try {
        // Initialize Google Identity Services
        google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });
        
        resolve(google.accounts.id.getConfiguration());
      } catch (error) {
        reject(error);
      }
    };
    
    script.onerror = (error) => {
      reject(error);
    };
    
    document.head.appendChild(script);
  });
};

// Function to handle Google response
export const handleGoogleResponse = async (response: google.accounts.id.CredentialResponse) => {
  // Decode the JWT token
  const payload = decodeJwtResponse(response.credential);
  
  try {
    // Check if user exists in database
    const { getUserByEmail, addUser } = await import('./mongoDb');
    
    const user = await getUserByEmail(payload.email);
    
    if (!user) {
      // Create user if not exists
      await addUser({
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        googleId: payload.sub,
        verified: true, // Google accounts are pre-verified
        createdAt: new Date(),
      });
    }
    
    // In a real application, you would set up an authentication session here
    const { toast } = await import('@/components/ui/use-toast');
    toast({
      title: "Google Sign-In Successful",
      description: `Welcome, ${payload.name}!`,
    });
    
    // Redirect to the admin page
    window.location.href = '/admin';
  } catch (error) {
    console.error("Error handling Google sign-in:", error);
  }
  
  // Return user data from token
  return {
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
    token: response.credential
  };
};

// Function to decode JWT token
const decodeJwtResponse = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
  
  return JSON.parse(jsonPayload);
};

// Function to display the Google Sign-In button
export const renderGoogleButton = (elementId: string) => {
  google.accounts.id.renderButton(
    document.getElementById(elementId)!,
    { 
      theme: 'outline', 
      size: 'large',
      type: 'standard',
      text: 'continue_with',
      shape: 'rectangular',
      logo_alignment: 'left',
      width: 250
    }
  );
};

// Function to prompt the Google Sign-In popup
export const promptGoogleSignIn = () => {
  google.accounts.id.prompt();
};
