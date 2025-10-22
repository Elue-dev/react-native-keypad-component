'use client';

import { Button } from '@/components/button';
import { CodeBlock } from '@/components/code-block';
import { ArrowRight, Code2, Lock, Zap, Smartphone, Copy } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('npm install react-native-keypad-component');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden px-4 py-20 sm:py-32 lg:py-40">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
            <span className="text-sm font-medium text-primary">
              React Native Keypad Component
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
            Beautiful Keypad Component for React Native
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
            A customizable and animated keypad component perfect for PIN entry,
            passcode screens, and secure input scenarios. Built with performance
            and developer experience in mind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/docs">
              <Button size="lg" asChild>
                <div>
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Button>
            </Link>
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://github.com/Elue-dev/react-native-keypad-component"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </Button>
          </div>
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted px-4 py-2 rounded-lg">
            <Code2 className="h-4 w-4" />
            <span>npm install react-native-keypad-component</span>
            <button
              onClick={handleCopy}
              className="hover:text-foreground transition-colors cursor-pointer"
              title="Copy to clipboard"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="px-4 py-20 sm:py-32 border-t border-border"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build secure and beautiful input
              experiences
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="rounded-lg border border-border bg-card p-8 hover:border-primary/50 transition-colors">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Smooth Animations</h3>
              <p className="text-muted-foreground">
                Fluid and responsive animations that provide excellent user
                feedback and visual polish.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-8 hover:border-primary/50 transition-colors">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Input</h3>
              <p className="text-muted-foreground">
                Perfect for PIN entry and passcode screens with built-in
                security considerations.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-8 hover:border-primary/50 transition-colors">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Smartphone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fully Customizable</h3>
              <p className="text-muted-foreground">
                Customize colors, sizes, layouts, and behavior to match your
                app's design system.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="install"
        className="px-4 py-20 sm:py-32 border-t border-border"
      >
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Install the component and start building secure input experiences
              today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" asChild>
                <a
                  href="https://www.npmjs.com/package/react-native-keypad-component"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on NPM
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Link href="/docs">
                <Button size="lg" variant="outline" asChild>
                  <div>
                    View Documentation
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              MIT License • Open Source • Community Driven
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                  ⌨️
                </div>
                <span className="font-bold">Keypad</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Beautiful keypad component for React Native
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="https://github.com/Elue-dev/react-native-keypad-component"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.npmjs.com/package/react-native-keypad-component"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    NPM
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/docs#features">
                    <p className="hover:text-foreground transition-colors">
                      Features
                    </p>
                  </Link>
                </li>
                <li>
                  <Link href="/docs/advanced-usage">
                    <p className="hover:text-foreground transition-colors">
                      Usage
                    </p>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="https://github.com/Elue-dev/react-native-keypad-component/blob/main/LICENSE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    License
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>
              © 2025 react-native-keypad-component. Built with ❤️ by Elue
              Wisdom
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
