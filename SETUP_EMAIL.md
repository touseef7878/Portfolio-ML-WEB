# Email Contact Form Setup

Your portfolio uses **Web3Forms** for the contact form - a free service that requires no backend setup!

## Quick Setup (2 minutes)

1. **Get Your Access Key**
   - Go to [https://web3forms.com/](https://web3forms.com/)
   - Enter your email address (touseefurrehman5554@gmail.com)
   - Click "Get Access Key"
   - Check your email and copy the access key

2. **Add the Access Key**
   - Open `src/components/ContactSection.tsx`
   - Find line 36: `access_key: "YOUR_ACCESS_KEY_HERE"`
   - Replace `YOUR_ACCESS_KEY_HERE` with your actual access key
   - Save the file

3. **Done!**
   - Your contact form will now send emails directly to your inbox
   - No environment variables needed
   - No backend server required
   - Completely free (up to 250 submissions/month)

## Example

```javascript
access_key: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", // Your actual key
```

## Features

- ✅ No backend required
- ✅ No API keys to hide
- ✅ Spam protection included
- ✅ Email notifications
- ✅ Free forever (250 submissions/month)
- ✅ Works immediately after setup

## Testing

After adding your access key:
1. Run your portfolio: `npm run dev`
2. Go to the contact section
3. Fill out the form and submit
4. Check your email inbox!

## Support

If you need help, visit [Web3Forms Documentation](https://docs.web3forms.com/)
