import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angular5-social-login';

export function getAuthServiceConfigs() {
    const config = new AuthServiceConfig([
        {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('521205883336-qnl8gv47l58t7oc1igfqvieb0ksa476d.apps.googleusercontent.com')
        },
        {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1955686437795814')
        }
    ]);
    return config;
}
