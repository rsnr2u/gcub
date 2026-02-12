/**
 * TAILWIND SAFELIST
 * This file is not imported anywhere. Its sole purpose is to ensure that Tailwind CSS 
 * generates these classes even if they are only found in the database-driven CMS content.
 * 
 * Add any Tailwind classes you frequently use in your Rich Text Editor / HTML Source View here.
 */

const safelist = [
    // Text Colors
    'text-blue-900', 'text-blue-800', 'text-blue-100', 'text-blue-200',
    'text-slate-700', 'text-slate-800', 'text-slate-100', 'text-slate-200',
    'text-green-800', 'text-green-700', 'text-green-600',
    'text-white', 'text-gray-700', 'text-gray-800',

    // Backgrounds
    'bg-blue-900', 'bg-blue-800', 'bg-blue-50', 'bg-blue-100',
    'bg-slate-100', 'bg-slate-50', 'bg-slate-200',
    'bg-green-700', 'bg-green-600', 'bg-green-50',
    'hover:bg-blue-800', 'hover:bg-green-600',

    // Spacing & Layout
    'mb-2', 'mb-4', 'mb-6', 'mt-4', 'mt-6', 'p-4', 'p-6', 'px-4', 'px-6', 'py-2', 'py-3', 'pl-6',
    'gap-4', 'space-y-2', 'leading-relaxed',

    // Borders
    'border-blue-900', 'border-blue-200', 'border-slate-200', 'border-green-700',
    'border-l-4', 'border', 'divide-y',

    // Typography & Shapes
    'text-2xl', 'text-xl', 'text-lg', 'text-sm', 'font-bold', 'font-medium', 'font-semibold',
    'rounded', 'rounded-lg', 'rounded-xl', 'rounded-3xl', 'overflow-hidden', 'overflow-x-auto',

    // Tables
    'w-full', 'text-left'
];
