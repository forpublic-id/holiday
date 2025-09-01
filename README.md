# Holiday Calendar Indonesia

<div align="center">
<img src="public/logo.svg" alt="Holiday Calendar Indonesia" width="80" height="80">
<br><br>
<strong>by</strong> <span style="color: #ffffff; background: #000000; padding: 2px 4px; border-radius: 4px;">ForPublic</span><span style="color: #dc2626; background: #000000; padding: 2px 4px; border-radius: 4px;">.id</span>
</div>

A comprehensive and user-friendly Indonesian holiday calendar application with bilingual support.

**Live Demo**: [holiday.forpublic.id](https://holiday.forpublic.id)

## Features

### Smart Holiday Filtering

- **Default view**: Shows national holidays and joint leave days only
- **Regional filter**: Toggle to view province-specific holidays
- **All holidays**: Option to display all holiday types

### Bilingual Support

- Complete Indonesian and English interface
- SEO-friendly URLs for each language (`/id/2025/januari` vs `/en/2025/january`)
- Easy language switching

### Interactive Calendar

- Responsive calendar display that works on all devices
- Smooth month and year navigation
- Today highlighting with automatic detection
- Consistent color coding for different holiday types

### Holiday Types

| Type              | Color  | Description                           | Examples                      |
| ----------------- | ------ | ------------------------------------- | ----------------------------- |
| National Holiday  | Red    | Official national holidays            | Independence Day, Eid al-Fitr |
| Joint Leave       | Orange | National leave days set by government | Joint leave for Eid           |
| Regional Holiday  | Blue   | Province/region-specific holidays     | Jakarta Anniversary           |
| Religious Holiday | Purple | Religious celebrations                | Vesak, Christmas              |

## Technology Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **next-intl** - Internationalization support
- **Bun** - Fast JavaScript runtime and package manager

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/forpublic-id/holiday.git
cd holiday

# Install dependencies
bun install

# Run development server
bun run dev

# Build for production
bun run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing

We welcome contributions from the community!

### How to Contribute

1. Fork this repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Create a Pull Request

### Reporting Issues

Found a bug? [Create a new issue](https://github.com/forpublic-id/holiday/issues) with:

- Clear bug description
- Steps to reproduce
- Screenshots if applicable
- Browser and device information

## License

This project is licensed under the [MIT License](LICENSE).

## About

Developed with care by the **[ForPublic.id](https://forpublic.id)** team.

For support and inquiries, visit our [website](https://forpublic.id) or create an issue on GitHub.
