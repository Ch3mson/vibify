import React from 'react';

export default function Footer() {

   var year = new Date().getFullYear();
    
  return (
    <footer className='mt-auto text-center text-slate-400 py-5 px-7 border-t border-slate-800 dark:border-slate-100'>
      <small>&copy; {year}. Benson Yan.</small>
    </footer>
  );
}
