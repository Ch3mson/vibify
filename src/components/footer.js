import React from 'react';

export default function Footer() {

   var year = new Date().getFullYear();
    
  return (
    <footer className='mt-auto text-center text-zinc-400 py-5 px-7 border-t border-slate-800'>
      <small>&copy; {year}. Benson Yan.</small>
    </footer>
  );
}
