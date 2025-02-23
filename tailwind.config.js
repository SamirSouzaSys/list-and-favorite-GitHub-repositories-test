/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mobile: "640px",
      desktop: "1440px",
    },
    extend: {
      colors: {
        primary: "#32C0C6",
        "primary-dark": "#329599",
        placeholder: "#8C8C8C",
        "grey-neutral": "#616161",
        "grey-dark": "#4E4E4E",
        "white-background-light": "#FFFFFF",
        "white-background-matte": "#F3F3F5",
        "border-and-line": "#E9ECEF",
        "success-check": "#5CB85C",
        warning: "#FFB22B",
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
      fontSize: {
        "heading-1": "21px",
        "heading-2": "18px",
        "heading-3": "18px",
        "heading-4": "16px",
        "heading-5": "16px",
        "paragraph-md": "14px",
        "paragraph-sm": "12px",
      },
    },
  },
  plugins: [],
};
