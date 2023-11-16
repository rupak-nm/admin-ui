import { Metadata } from 'next';
import * as React from 'react';

import './not-found.scss';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  return (
    <main className='not found page wrapper'>
      <section>
        <div>
          <h1>Page Not Found</h1>
          <a href='/'>Back to home</a>
        </div>
      </section>
    </main>
  );
}
