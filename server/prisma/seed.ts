import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const activities = [
  {
    name: 'Running',
    category: 'Sport',
    description:
      'Running is one of the most accessible and rewarding physical activities. Whether you prefer trail running through nature or urban jogging, it improves cardiovascular health, mental clarity, and endurance.',
    price: 0,
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&auto=format&fit=crop',
    equipment: ['Running shoes', 'Moisture-wicking clothing', 'Water bottle'],
  },
  {
    name: 'Drawing',
    category: 'Creative',
    description:
      'Drawing is a fundamental art form that lets you express creativity on paper or digitally. From sketching portraits to detailed illustrations, it is a relaxing and rewarding skill that improves with practice.',
    price: 15,
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop',
    equipment: ['Sketchbook', 'Pencils (HB, 2B, 4B)', 'Erasers', 'Sharpener'],
  },
  {
    name: 'Yoga',
    category: 'Sport',
    description:
      'Yoga combines physical postures, breathing techniques, and meditation to improve flexibility, strength, and mental wellbeing. Suitable for all ages and fitness levels.',
    price: 50,
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop',
    equipment: ['Yoga mat', 'Comfortable clothes', 'Yoga blocks (optional)'],
  },
  {
    name: 'Photography',
    category: 'Creative',
    description:
      'Photography is the art of capturing moments and telling stories through images. From landscapes to portraits, it trains your eye for composition, light, and detail.',
    price: 80,
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop',
    equipment: ['Camera (DSLR or mirrorless)', 'Memory cards', 'Camera bag', 'Lens cleaning kit'],
  },
  {
    name: 'Reading',
    category: 'Learning',
    description:
      'Reading is the ultimate low-cost hobby that expands your mind, vocabulary, and empathy. Dive into fiction, non-fiction, history, science, or philosophy.',
    price: 10,
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop',
    equipment: ['Books or e-reader', 'Reading lamp', 'Bookmark'],
  },
  {
    name: 'Cooking',
    category: 'Creative',
    description:
      'Cooking is both a practical skill and a creative outlet. Experiment with flavors, cuisines, and techniques to create delicious meals for yourself and others.',
    price: 60,
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop',
    equipment: ['Chef knife', 'Cutting board', 'Pots and pans', 'Kitchen scale'],
  },
  {
    name: 'Gardening',
    category: 'Nature',
    description:
      'Gardening connects you with nature and produces beautiful flowers, herbs, or vegetables. It is therapeutic, sustainable, and deeply satisfying when you see your plants thrive.',
    price: 30,
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&auto=format&fit=crop',
    equipment: ['Gloves', 'Trowel', 'Watering can', 'Plant pots or garden bed'],
  },
  {
    name: 'Chess',
    category: 'Learning',
    description:
      'Chess is a timeless strategy game that sharpens critical thinking, planning, and problem-solving skills. Play locally or online against players worldwide.',
    price: 20,
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&auto=format&fit=crop',
    equipment: ['Chess board and pieces', 'Chess clock (optional)', 'Chess books'],
  },
  {
    name: 'Hiking',
    category: 'Nature',
    description:
      'Hiking takes you through stunning landscapes and natural wonders. It combines physical exercise with the mental health benefits of being in nature.',
    price: 40,
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&auto=format&fit=crop',
    equipment: ['Hiking boots', 'Backpack', 'Water bottle', 'Trail map', 'First aid kit'],
  },
  {
    name: 'Guitar',
    category: 'Creative',
    description:
      'Playing guitar opens a world of musical expression. Learn chords, scales, and songs — from acoustic folk to electric rock.',
    price: 100,
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&auto=format&fit=crop',
    equipment: ['Acoustic or electric guitar', 'Picks', 'Tuner', 'Guitar strap'],
  },
  {
    name: 'Cycling',
    category: 'Sport',
    description:
      'Cycling is an eco-friendly, low-impact sport that lets you explore your surroundings while improving fitness. From road cycling to mountain biking, there is a style for everyone.',
    price: 120,
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?w=800&auto=format&fit=crop',
    equipment: ['Bicycle', 'Helmet', 'Cycling gloves', 'Repair kit', 'Water bottle'],
  },
  {
    name: 'Board Games',
    category: 'Social',
    description:
      'Board gaming is a fantastic social hobby that brings people together for fun, laughter, and friendly competition. From strategy games to party games, there is something for every group.',
    price: 35,
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=800&auto=format&fit=crop',
    equipment: ['Board games collection', 'Card sleeves (optional)', 'Game organizers'],
  },
  {
    name: 'Meditation',
    category: 'Culture',
    description:
      'Meditation is a practice of focused attention and mindfulness that reduces stress and improves mental clarity. Just 10 minutes a day can transform your wellbeing.',
    price: 0,
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop',
    equipment: ['Meditation cushion (optional)', 'Timer', 'Quiet space'],
  },
  {
    name: 'Knitting',
    category: 'Creative',
    description:
      'Knitting is a relaxing and productive hobby that produces beautiful scarves, sweaters, and accessories. It is meditative, portable, and you can gift your creations.',
    price: 25,
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1615233500064-fdf7f4a8f7b3?w=800&auto=format&fit=crop',
    equipment: ['Knitting needles', 'Yarn', 'Stitch markers', 'Pattern books'],
  },
  {
    name: 'Rock Climbing',
    category: 'Sport',
    description:
      'Rock climbing combines strength, flexibility, and problem-solving. Indoor climbing gyms make it accessible year-round, while outdoor routes offer breathtaking experiences.',
    price: 80,
    difficulty: 'Advanced',
    image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&auto=format&fit=crop',
    equipment: ['Climbing shoes', 'Harness', 'Chalk bag', 'Belay device', 'Helmet'],
  },
  {
    name: 'Painting',
    category: 'Creative',
    description:
      'Painting allows you to express emotions and ideas through color and form. Explore watercolor, acrylic, or oil techniques to create stunning artwork.',
    price: 45,
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&auto=format&fit=crop',
    equipment: ['Canvas or paper', 'Paints (acrylic/watercolor)', 'Brushes', 'Palette', 'Easel'],
  },
  {
    name: 'Language Learning',
    category: 'Learning',
    description:
      'Learning a new language opens doors to new cultures, people, and opportunities. Apps, classes, and immersion methods make it easier than ever to become multilingual.',
    price: 15,
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop',
    equipment: ['Language learning app', 'Textbooks', 'Flashcards', 'Language exchange partner'],
  },
  {
    name: 'Volunteering',
    category: 'Social',
    description:
      'Volunteering gives back to your community while building connections and purpose. From food banks to environmental projects, find a cause that speaks to you.',
    price: 0,
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop',
    equipment: ['Comfortable work clothes', 'Enthusiasm and time'],
  },
];

async function main() {
  console.log('🌱 Seeding database...');

  // Delete existing data
  await prisma.favorite.deleteMany();
  await prisma.preferences.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.user.deleteMany();

  // Create activities
  for (const activity of activities) {
    await prisma.activity.create({ data: activity });
  }

  console.log(`✅ Created ${activities.length} activities`);
  console.log('🎉 Database seeded successfully!');
}

main()
  .catch(e => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
