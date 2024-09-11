import React from 'react';

export default function Footer() {

   var year = new Date().getFullYear();
    
  return (
    <footer className='mt-auto text-center text-slate-400 py-5 px-7 border-t'>
      <small>&copy; {year}. Benson Yan.</small>
    </footer>
  );
}
