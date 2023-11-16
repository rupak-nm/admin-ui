'use client';

import Head from 'next/head';
import * as React from 'react';

import './page.scss';

import Header from '@/components/Header';
import LiquidityCycleTable from '@/components/LiquidityCycleTable';

export default function HomePage() {
  return (
    <main>
      <Head>
        <title>LP Unlock Cycle - NeptuneMutual</title>
      </Head>

      <Header />

      <section className='section'>
        <div>
          <LiquidityCycleTable />
        </div>
      </section>
    </main>
  );
}
