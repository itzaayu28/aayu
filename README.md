# 🎨 Glassy Profile Page

A stunning, customizable profile page with glassmorphism design, music player, and smooth animations.

## ⚡ Quick Start (3 Steps!)

1. **Edit** `config.js` - Change your info (username, links, etc.)
2. **Replace** images in `assets/` folder with your own
3. **Open** `index.html` in your browser - Done! 🎉

## 📝 How to Customize

### Step 1: Edit Your Info

Open `config.js` and change these values:

```javascript
const CONFIG = {
    profile: {
        username: "YOUR_NAME",           // ← Change this
        bio: "Your custom message",      // ← And this
        location: "Your City",           // ← And this
        // ... etc
    }
}
```

### Step 2: Replace Images

Put your images in the `assets/` folder:

| Replace This File | With Your | Size |
|-------------------|-----------|------|
| `profile.jpg` | Profile picture | 200x200px |
| `discord-avatar.jpg` | Discord avatar | 200x200px |
| `minecraft-avatar.png` | Minecraft skin | 200x200px |
| `background.mp4` | Background video | 1920x1080px |

### Step 3: Add Your Music

1. Put your `.mp3` files in `assets/`
2. Edit `config.js`:

```javascript
music: {
    playlist: [
        {
            title: "Song Name",
            file: "assets/your-song.mp3"  // ← Add your song here
        }
    ]
}
```

## 🎯 Common Customizations

### Change Discord Status

```javascript
discord: {
    status: "online",  // Options: online, idle, dnd, offline
}
```

### Show/Hide Discord Badges

```javascript
discord: {
    showNitro: true,           // true = show, false = hide
    showBugHunter: false,
    showEarlySupporter: true
}
```

### Update Social Links

```javascript
social: {
    discordLink: "https://discord.com/users/YOUR_ID",
    instagramLink: "https://instagram.com/YOUR_USERNAME"
}
```

### Change Minecraft Status

```javascript
minecraft: {
    isOnline: true,              // true = online, false = offline
    statusText: "Your status"
}
```

## 📁 What's What?

```
📦 bilota/
├── 📄 index.html       ← The main page
├── 📄 config.js        ← ⭐ EDIT THIS to customize
├── 📄 script.js        ← Makes everything work
├── 📄 style.css        ← Extra styling
└── 📁 assets/          ← Put your images/music here
    ├── 🖼️ profile.jpg
    ├── 🖼️ discord-avatar.jpg
    ├── 🖼️ minecraft-avatar.png
    ├── 🎬 background.mp4
    ├── 🎵 music.mp3
    └── 🖱️ cursor.webp
```

## 🔧 Troubleshooting

### Music Not Playing?
- Click anywhere on the page first (browsers require this)
- Check your file path in `config.js`
- Make sure file is `.mp3` format

### Images Not Showing?
- Check file names match exactly (case-sensitive!)
- Make sure images are in `assets/` folder
- Try refreshing the page (Ctrl+F5)

### Cursor Not Working?
- Make sure `cursor.webp` is in `assets/`
- Try a different browser (Chrome works best)

## 💡 Pro Tips

✅ **DO:**
- Compress images before adding them (use tinypng.com)
- Keep file names simple (no spaces or special characters)
- Test in Chrome/Edge for best results

❌ **DON'T:**
- Delete files from `assets/` folder
- Change file names without updating `config.js`
- Edit `script.js` unless you know JavaScript

## 🎨 Want More Customization?

### Change Colors
Edit the CSS in `index.html`:
```css
.glass-panel {
    background: rgba(255, 255, 255, 0.12);  /* Change these numbers */
}
```

### Adjust Animation Speed
In `index.html`, find:
```javascript
'pulse-slow': 'pulse 3s ...'  // Change 3s to 2s for faster
```

## 📱 Browser Support

- ✅ Chrome (Best)
- ✅ Edge (Best)
- ✅ Firefox (Good)
- ✅ Safari (Good)
- ⚠️ Mobile (Works, but no custom cursor)

## 🆘 Need Help?

1. Make sure you edited `config.js` correctly
2. Check browser console for errors (F12)
3. Try opening in a different browser
4. Make sure all files are in the right folders

## 📄 License

Free to use! Modify as you like for personal projects.

---

**Made with ❤️ | Enjoy your profile page! 🎉**
