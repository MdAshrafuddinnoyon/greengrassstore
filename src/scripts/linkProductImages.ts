// Script: linkProductImages.ts
// Description: Links product images in the database by matching product slug/name with image filenames in the 'products' folder.
// Usage: Run this script in your Supabase/Node.js environment after uploading images.

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const MEDIA_BASE_URL = `${supabaseUrl}/storage/v1/object/public/media/products/`;

async function linkProductImages() {
  // 1. Fetch all products
  const { data: products, error: prodError } = await supabase.from('products').select('id, name, slug, featured_image');
  if (prodError) throw prodError;

  // 2. Fetch all product images from media_files table (products folder)
  const { data: images, error: imgError } = await supabase
    .from('media_files')
    .select('file_name, file_path, folder')
    .eq('folder', 'products');
  if (imgError) throw imgError;

  let updated = 0;
  for (const product of products) {
    // Try to match by slug or normalized name
    const slug = product.slug || product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const match = images.find(img => {
      const base = img.file_name.split('.')[0];
      return base === slug;
    });
    if (match) {
      const publicUrl = MEDIA_BASE_URL + match.file_name;
      // Update product's featured_image if not already set or different
      if (product.featured_image !== publicUrl) {
        await supabase.from('products').update({ featured_image: publicUrl }).eq('id', product.id);
        updated++;
      }
    }
  }
  console.log(`Linked images for ${updated} products.`);
}

linkProductImages().catch(console.error);
