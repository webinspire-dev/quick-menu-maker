const footerLinks = {
  Product: ["Features", "Pricing", "Templates", "API"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

const Footer = () => (
  <footer className="bg-foreground text-background py-16">
    <div className="container mx-auto px-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div>
          <span className="text-xl font-extrabold">
            Menu<span className="text-primary">Flow</span>
          </span>
          <p className="text-sm text-background/60 mt-3">
            The easiest way to create a digital menu for your restaurant.
          </p>
        </div>
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="font-bold text-sm mb-4">{title}</h4>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-background/10 pt-8 text-center text-sm text-background/40">
        © {new Date().getFullYear()} MenuFlow. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
