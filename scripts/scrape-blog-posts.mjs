#!/usr/bin/env node

/**
 * Script to scrape all blog posts from wp.krischase.com/journal/
 * and store them as static data files
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

// Blog post URLs extracted from the journal page
const blogPostUrls = [
  'https://wp.krischase.com/updated-how-to-find-and-clean-up-infected-wordpress-files-over-ssh/',
  'https://wp.krischase.com/find-user-used-coupon-code-magento/',
  'https://wp.krischase.com/use-wpcli-and-cron-to-unpublish-wordpress-page/',
  'https://wp.krischase.com/easily-monitor-uptime-on-whm-cpanel-server-with-uptimerobot/',
  'https://wp.krischase.com/remove-visual-composer-excerpt/',
  'https://wp.krischase.com/robotsdeploy/',
  'https://wp.krischase.com/force-non-legacy-backup-start-whmcpanel/',
  'https://wp.krischase.com/wordpress-bash-scripts/',
  'https://wp.krischase.com/black-friday-deals-for-web-developers/',
  'https://wp.krischase.com/optimize-all-images-within-current-directory/',
  'https://wp.krischase.com/how-to-migrate-magento-customers-and-orders/',
  'https://wp.krischase.com/use-php-to-pull-users-instagram-feed/',
  'https://wp.krischase.com/tuning-and-benchmarking-apache-and-mysql/',
  'https://wp.krischase.com/prevent-gmail-from-breaking-width-of-email-template/',
  'https://wp.krischase.com/find-all-files-touched-within-the-last-2-weeks/',
  'https://wp.krischase.com/get-a-list-of-all-installed-magento-patches/',
  'https://wp.krischase.com/find-text-between-tags-sublime-text/',
  'https://wp.krischase.com/laravel-force-https/',
  'https://wp.krischase.com/automatically-check-wpml-custom-field-checkboxes/',
  'https://wp.krischase.com/how-to-skip-fsck-after-reboot/',
  'https://wp.krischase.com/detect-and-prevent-malware-in-gravity-forms-file-upload-with-php-clamav/',
  'https://wp.krischase.com/pull-youtube-description-into-wordpress-content/',
  'https://wp.krischase.com/how-to-find-and-clean-up-infected-wordpress-files-over-ssh/',
  'https://wp.krischase.com/disable-all-mail-for-wordpress/',
  'https://wp.krischase.com/create-options-pages-in-wordpress-with-advanced-custom-fields-acf/',
  'https://wp.krischase.com/get-the-latest-post-id-in-wordpress/',
  'https://wp.krischase.com/dynamically-add-parameters-to-the-end-of-all-wp_nav_menu/',
  'https://wp.krischase.com/force-wordpress-user-to-logout-after-inactivity/',
  'https://wp.krischase.com/set-wordpress-image-quality-to-high/',
  'https://wp.krischase.com/how-to-create-custom-auto-generated-image-sizes-in-wordpress/',
  'https://wp.krischase.com/remove-the-ability-to-edit-theme-in-wordpress-admin/',
  'https://wp.krischase.com/social-media-sharing-links-without-using-a-plugin/',
  'https://wp.krischase.com/require-login-to-view-wordpress-site/',
  'https://wp.krischase.com/how-to-grab-first-image-from-wordpress-post-content/',
  'https://wp.krischase.com/how-to-load-jquery-in-wordpress-theme/',
];

// Metadata from the journal page listing
const postMetadata = {
  'https://wp.krischase.com/updated-how-to-find-and-clean-up-infected-wordpress-files-over-ssh/': {
    category: 'Linux',
    date: '2020.05.02',
  },
  'https://wp.krischase.com/find-user-used-coupon-code-magento/': {
    category: 'Development',
    date: '2016.06.02',
  },
  'https://wp.krischase.com/use-wpcli-and-cron-to-unpublish-wordpress-page/': {
    category: 'Development',
    date: '2016.05.14',
  },
  'https://wp.krischase.com/easily-monitor-uptime-on-whm-cpanel-server-with-uptimerobot/': {
    category: 'Development',
    date: '2016.05.06',
  },
  'https://wp.krischase.com/remove-visual-composer-excerpt/': {
    category: 'Development',
    date: '2016.05.04',
  },
  'https://wp.krischase.com/robotsdeploy/': {
    category: 'Development',
    date: '2016.04.19',
  },
  'https://wp.krischase.com/force-non-legacy-backup-start-whmcpanel/': {
    category: 'Uncategorized',
    date: '2016.02.02',
  },
  'https://wp.krischase.com/wordpress-bash-scripts/': {
    category: 'Development',
    date: '2016.01.22',
  },
  'https://wp.krischase.com/black-friday-deals-for-web-developers/': {
    category: 'Bootstrap',
    date: '2015.11.26',
  },
  'https://wp.krischase.com/optimize-all-images-within-current-directory/': {
    category: 'Development',
    date: '2015.10.12',
  },
  'https://wp.krischase.com/how-to-migrate-magento-customers-and-orders/': {
    category: 'Magento',
    date: '2015.09.16',
  },
  'https://wp.krischase.com/use-php-to-pull-users-instagram-feed/': {
    category: 'Development',
    date: '2015.09.16',
  },
  'https://wp.krischase.com/tuning-and-benchmarking-apache-and-mysql/': {
    category: 'Linux',
    date: '2015.09.10',
  },
  'https://wp.krischase.com/prevent-gmail-from-breaking-width-of-email-template/': {
    category: 'Development',
    date: '2015.08.14',
  },
  'https://wp.krischase.com/find-all-files-touched-within-the-last-2-weeks/': {
    category: 'PHP',
    date: '2015.07.10',
  },
  'https://wp.krischase.com/get-a-list-of-all-installed-magento-patches/': {
    category: 'Magento',
    date: '2015.07.09',
  },
  'https://wp.krischase.com/find-text-between-tags-sublime-text/': {
    category: 'Development',
    date: '2015.04.29',
  },
  'https://wp.krischase.com/laravel-force-https/': {
    category: 'Uncategorized',
    date: '2015.03.31',
  },
  'https://wp.krischase.com/automatically-check-wpml-custom-field-checkboxes/': {
    category: 'Development',
    date: '2015.02.20',
  },
  'https://wp.krischase.com/how-to-skip-fsck-after-reboot/': {
    category: 'Development',
    date: '2015.01.30',
  },
  'https://wp.krischase.com/detect-and-prevent-malware-in-gravity-forms-file-upload-with-php-clamav/': {
    category: 'Gravity Forms',
    date: '2015.01.07',
  },
  'https://wp.krischase.com/pull-youtube-description-into-wordpress-content/': {
    category: 'Development',
    date: '2014.12.11',
  },
  'https://wp.krischase.com/how-to-find-and-clean-up-infected-wordpress-files-over-ssh/': {
    category: 'PHP',
    date: '2014.11.28',
  },
  'https://wp.krischase.com/disable-all-mail-for-wordpress/': {
    category: 'PHP',
    date: '2014.11.18',
  },
  'https://wp.krischase.com/create-options-pages-in-wordpress-with-advanced-custom-fields-acf/': {
    category: 'PHP',
    date: '2014.10.29',
  },
  'https://wp.krischase.com/get-the-latest-post-id-in-wordpress/': {
    category: 'PHP',
    date: '2014.10.29',
  },
  'https://wp.krischase.com/dynamically-add-parameters-to-the-end-of-all-wp_nav_menu/': {
    category: 'PHP',
    date: '2014.10.28',
  },
  'https://wp.krischase.com/force-wordpress-user-to-logout-after-inactivity/': {
    category: 'PHP',
    date: '2014.10.27',
  },
  'https://wp.krischase.com/set-wordpress-image-quality-to-high/': {
    category: 'PHP',
    date: '2014.10.24',
  },
  'https://wp.krischase.com/how-to-create-custom-auto-generated-image-sizes-in-wordpress/': {
    category: 'PHP',
    date: '2014.10.24',
  },
  'https://wp.krischase.com/remove-the-ability-to-edit-theme-in-wordpress-admin/': {
    category: 'PHP',
    date: '2014.10.24',
  },
  'https://wp.krischase.com/social-media-sharing-links-without-using-a-plugin/': {
    category: 'Uncategorized',
    date: '2014.10.23',
  },
  'https://wp.krischase.com/require-login-to-view-wordpress-site/': {
    category: 'PHP',
    date: '2014.10.23',
  },
  'https://wp.krischase.com/how-to-grab-first-image-from-wordpress-post-content/': {
    category: 'PHP',
    date: '2014.10.23',
  },
  'https://wp.krischase.com/how-to-load-jquery-in-wordpress-theme/': {
    category: 'jQuery',
    date: '2014.10.21',
  },
};

console.log(`Found ${blogPostUrls.length} blog posts to scrape.`);
console.log('Note: This script requires Firecrawl MCP to be available.');
console.log('Please run this script with access to Firecrawl MCP tools.\n');

// This script will be called by a Node.js script that has access to Firecrawl
// For now, we'll create the structure and data file template

export { blogPostUrls, postMetadata };

