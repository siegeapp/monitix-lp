# Google Analytics & Tracking Setup

## 📊 Setting Up Google Analytics 4 (GA4)

### Step 1: Create GA4 Property

1. Go to https://analytics.google.com/
2. Click "Admin" (gear icon)
3. Click "Create Property"
4. Fill in property details:
   - Property name: Stock Crypto Alarm & Watch Landing Page
   - Reporting time zone: Your timezone
   - Currency: Your currency
5. Click "Next" and complete setup

### Step 2: Get Your Measurement ID

Your Measurement ID will look like: `G-XXXXXXXXXX`

### Step 3: Add Tracking Code to index.html

Add this code in the `<head>` section of `index.html`, right before `</head>`:

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    'page_title': document.title,
    'page_location': window.location.href,
    'page_path': window.location.pathname
  });
</script>
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

## 🎯 Event Tracking

### Track Button Clicks

Add this code to `script.js` (already partially implemented):

```javascript
// Track CTA button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const buttonText = this.textContent.trim();
        const buttonHref = this.getAttribute('href');
        
        // Send event to Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'button_click', {
                'event_category': 'CTA',
                'event_label': buttonText,
                'button_location': this.closest('section')?.className || 'unknown',
                'destination_url': buttonHref
            });
        }
        
        console.log('Button clicked:', buttonText);
    });
});
```

### Track Language Changes

Add to `script.js` in the `changeLanguage` function:

```javascript
function changeLanguage(lang) {
    // ... existing code ...
    
    // Track language change
    if (typeof gtag !== 'undefined') {
        gtag('event', 'language_change', {
            'event_category': 'User Interaction',
            'event_label': lang,
            'previous_language': document.documentElement.lang
        });
    }
    
    // ... rest of existing code ...
}
```

### Track Scroll Depth

Add this to `script.js`:

```javascript
// Track scroll depth
let scrollTracked = {
    '25': false,
    '50': false,
    '75': false,
    '100': false
};

window.addEventListener('scroll', function() {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    Object.keys(scrollTracked).forEach(depth => {
        if (!scrollTracked[depth] && scrollPercentage >= parseInt(depth)) {
            scrollTracked[depth] = true;
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'scroll', {
                    'event_category': 'Engagement',
                    'event_label': depth + '%',
                    'value': parseInt(depth)
                });
            }
        }
    });
});
```

### Track Outbound Links

Add this to `script.js`:

```javascript
// Track outbound links
document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.hostname !== window.location.hostname) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                'event_category': 'Outbound Link',
                'event_label': link.href,
                'transport_type': 'beacon'
            });
        }
    }
});
```

## 🔥 Custom Events

### Track Extension Installs

When users click "Add to Chrome" or "Add to Edge":

```javascript
// Add this to the button click handler
gtag('event', 'extension_install_click', {
    'event_category': 'Conversion',
    'event_label': 'Chrome', // or 'Edge'
    'value': 1
});
```

### Track Video Views (if you add videos)

```javascript
const video = document.querySelector('video');
if (video) {
    // Track video start
    video.addEventListener('play', function() {
        gtag('event', 'video_start', {
            'event_category': 'Video',
            'event_label': 'Product Demo'
        });
    });
    
    // Track video completion
    video.addEventListener('ended', function() {
        gtag('event', 'video_complete', {
            'event_category': 'Video',
            'event_label': 'Product Demo'
        });
    });
}
```

## 📈 Set Up Goals in GA4

### Goal 1: Extension Install Click
- Event name: `extension_install_click`
- Mark as conversion: Yes

### Goal 2: Scroll to Pricing
- Event name: `scroll`
- Condition: event_label equals '75%'

### Goal 3: Language Engagement
- Event name: `language_change`
- Shows user interest in international versions

## 🎯 Enhanced E-commerce Tracking (Optional)

If you want to track premium subscriptions:

```javascript
// View pricing
gtag('event', 'view_item_list', {
    'item_list_name': 'Pricing Plans',
    'items': [
        {
            'item_id': 'free_plan',
            'item_name': 'Free Plan',
            'price': 0,
            'item_category': 'Subscription'
        },
        {
            'item_id': 'premium_plan',
            'item_name': 'Premium Plan',
            'price': 4.99,
            'item_category': 'Subscription'
        }
    ]
});

// Click on upgrade button
gtag('event', 'select_item', {
    'items': [{
        'item_id': 'premium_plan',
        'item_name': 'Premium Plan',
        'price': 4.99
    }]
});
```

## 🔍 Google Tag Manager (Alternative Method)

For more advanced tracking without editing code:

### Setup GTM

1. Create account at https://tagmanager.google.com/
2. Create container for your website
3. Add GTM code to `index.html`:

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
```

Add to `<body>`:

```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

## 📊 Facebook Pixel (Optional)

For Facebook ads tracking:

```html
<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
/></noscript>
<!-- End Facebook Pixel Code -->
```

## 🎨 Microsoft Clarity (Heatmaps & Session Recording)

Free tool for understanding user behavior:

1. Sign up at https://clarity.microsoft.com/
2. Add tracking code:

```html
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "YOUR_PROJECT_ID");
</script>
```

## 📊 Hotjar (Alternative Heatmaps)

1. Sign up at https://www.hotjar.com/
2. Add tracking code:

```html
<!-- Hotjar Tracking Code -->
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:YOUR_SITE_ID,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>
```

## 🔔 Privacy & GDPR Compliance

If serving European users, add cookie consent:

### Simple Cookie Notice

Add to `index.html`:

```html
<div id="cookie-notice" style="display:none; position:fixed; bottom:0; left:0; right:0; background:#1f2937; color:white; padding:20px; text-align:center; z-index:9999;">
    <p>We use cookies to improve your experience. <a href="/privacy" style="color:#3b82f6;">Learn more</a></p>
    <button onclick="acceptCookies()" style="background:#3b82f6; color:white; border:none; padding:10px 20px; border-radius:5px; cursor:pointer; margin-left:10px;">Accept</button>
</div>

<script>
function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    document.getElementById('cookie-notice').style.display = 'none';
}

if (!localStorage.getItem('cookiesAccepted')) {
    document.getElementById('cookie-notice').style.display = 'block';
}
</script>
```

## 📈 Reports to Monitor

### Daily
- Real-time users
- Top pages
- Traffic sources

### Weekly
- User demographics
- Device breakdown
- Top events
- Conversion rate

### Monthly
- Traffic trends
- Goal completion
- User retention
- Bounce rate analysis

## 🎯 Custom Dashboards

Create custom dashboards in GA4 for:
1. **Overview Dashboard**: Traffic, conversions, top sources
2. **Acquisition Dashboard**: How users find your site
3. **Engagement Dashboard**: User behavior and interactions
4. **Conversion Dashboard**: Extension installs and upgrades

## 🔗 Useful Links

- [GA4 Documentation](https://support.google.com/analytics/answer/10089681)
- [GTM Documentation](https://support.google.com/tagmanager)
- [GA4 Event Reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
- [Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4)

---

**Remember**: Always test your tracking in GA4's Real-Time reports before going live!

