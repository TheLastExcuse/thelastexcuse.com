# The Last Excuse

A brutally minimal static manifesto/log for GitHub Pages.

No build step. No framework. No CMS. No external fonts. One CSS file, one tiny JavaScript file, plain HTML, local SVG assets, and Plausible Analytics.

## File Structure

```text
/
  index.html
  manifesto.html
  blog.html
  404.html
  robots.txt
  sitemap.xml
  README.md
  CNAME.example
  assets/
    css/
      style.css
    js/
      site.js
    img/
      favicon.svg
      og-default.svg
  posts/
    entry-1.html
    entry-2.html
    entry-3.html
    template.html
```

## Simplest GitHub Pages Deployment

Recommended option: deploy from the repository root.

1. Create a new GitHub account if you want this to remain pseudonymous.
2. Create a new public repository, for example `the-last-excuse`.
3. Upload every file and folder from this project into the repository root.
4. Go to the repository on GitHub.
5. Open **Settings**.
6. Open **Pages**.
7. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
8. Set **Branch** to `main`.
9. Set the folder to `/root`.
10. Save.

GitHub will publish the site at:

```text
https://YOUR-GITHUB-USERNAME.github.io/the-last-excuse/
```

If you create a user site repository named `YOUR-GITHUB-USERNAME.github.io`, GitHub will publish it at:

```text
https://YOUR-GITHUB-USERNAME.github.io/
```

That user-site option is the cleanest if this is the only site on the pseudonymous account.

## Deploying From /docs Instead

If you prefer to keep project files outside the published root:

1. Create a `docs` folder.
2. Move all site files into `docs`.
3. In **Settings > Pages**, set the folder to `/docs`.

This site does not need `/docs`; root deployment is simpler.

## Before Going Live

The site is currently configured for:

```text
thelastexcuse.com
```

Canonical URLs, Open Graph image URLs, the sitemap, robots.txt, and Plausible all use that domain. Keep one canonical domain for SEO. The recommended canonical is the apex domain:

```text
https://thelastexcuse.com/
```

You can still serve `www.thelastexcuse.com`, but it should redirect or point cleanly to the canonical apex domain.

## Custom Domain

1. Buy a domain using privacy-protected registration.
2. In GitHub, open **Settings > Pages**.
3. Under **Custom domain**, enter the domain.
4. Save.
5. GitHub will ask you to configure DNS.

For an apex domain like `example.com`, add GitHub Pages `A` records at your DNS provider:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

For `www.example.com`, add a `CNAME` record pointing to:

```text
YOUR-GITHUB-USERNAME.github.io
```

After DNS works, enable **Enforce HTTPS** in **Settings > Pages**.

## CNAME File

When you are ready to use a custom domain:

1. Duplicate `CNAME.example`.
2. Rename the duplicate to `CNAME`.
3. Replace the content with your domain only:

```text
thelastexcuse.com
```

Do not include `https://`.

## Verify the Custom Domain

GitHub lets you verify domains to prevent takeover.

1. Open your GitHub account settings.
2. Go to **Pages**.
3. Add your domain under verified domains.
4. Add the DNS `TXT` record GitHub gives you.
5. Wait for verification.

This is strongly recommended before publishing under a custom domain.

## Plausible Analytics

Plausible is already integrated with this script:

```html
<!-- Privacy-friendly analytics by Plausible. Configure both thelastexcuse.com and www.thelastexcuse.com in Plausible if you serve both. -->
<script async src="https://plausible.io/js/pa-VzKI-ty6OOLgQUsf6KdsG.js"></script>
<script>
  window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
  plausible.init()
</script>
```

To activate it:

1. Create a Plausible account.
2. Add `thelastexcuse.com` in Plausible.
3. If Plausible requires it for your account setup, also add or allow `www.thelastexcuse.com`.
4. Deploy the site.
5. Visit both `https://thelastexcuse.com/` and `https://www.thelastexcuse.com/`.
6. Check Plausible to confirm visits are recorded.

Expected metrics include:

- visitors
- pageviews
- top pages
- referrers
- countries
- devices
- browsers
- operating systems
- entry pages
- exit pages

No Google Analytics is included. No cookie banner is needed for this basic Plausible setup.

## Google Search Console

1. Go to Google Search Console.
2. Add a new property.
3. Use a **Domain** property if you control DNS, or a **URL prefix** property if you only want to verify the exact site URL.
4. Follow Google's verification instructions.
5. If using DNS verification, add the `TXT` record at your DNS provider.
6. After verification, open **Sitemaps**.
7. Submit:

```text
https://thelastexcuse.com/sitemap.xml
```

If you are using a GitHub Pages subpath instead of a custom domain, submit the full GitHub Pages sitemap URL.

## Adding a New Post

1. Duplicate `posts/template.html`.
2. Rename it, for example:

```text
posts/entry-4.html
```

3. Update the title, date, meta description, canonical URL, Open Graph tags, Twitter tags, structured data, heading, and body.
4. Add the new post to `blog.html`.
5. Add the new post to the latest entries section in `index.html` if you want it featured.
6. Add the new post URL to `sitemap.xml`.
7. Update `robots.txt` only if your domain or sitemap location changes.

Keep filenames simple and lowercase.

## Keeping It Anonymous

- Use a pseudonymous GitHub account.
- Use privacy-protected domain registration.
- Do not add your real name to commits, profile, footer, metadata, or Plausible settings.
- Do not add email, social links, embedded widgets, comments, newsletter forms, or personal photos.
- Keep the author name as `Anonymous` or replace it with a pseudonym.
- Check Git config before committing:

```text
git config user.name
git config user.email
```

Use a pseudonymous email address or GitHub's private noreply email.

## Maintenance Notes

This site is intentionally manual. When you change a URL, update:

- the page itself
- internal links
- `sitemap.xml`
- `robots.txt` if the sitemap domain changes
- Plausible script if your Plausible site snippet changes

There is no build process. What you see in the files is what GitHub Pages serves.
