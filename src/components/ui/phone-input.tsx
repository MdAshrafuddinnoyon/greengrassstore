import * as React from "react";
import { ChevronDown, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const COUNTRIES = [
  { code: "+971", name: "UAE", flag: "🇦🇪" },
  { code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+965", name: "Kuwait", flag: "🇰🇼" },
  { code: "+974", name: "Qatar", flag: "🇶🇦" },
  { code: "+973", name: "Bahrain", flag: "🇧🇭" },
  { code: "+968", name: "Oman", flag: "🇴🇲" },
  { code: "+962", name: "Jordan", flag: "🇯🇴" },
  { code: "+961", name: "Lebanon", flag: "🇱🇧" },
  { code: "+20", name: "Egypt", flag: "🇪🇬" },
  { code: "+212", name: "Morocco", flag: "🇲🇦" },
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+92", name: "Pakistan", flag: "🇵🇰" },
  { code: "+880", name: "Bangladesh", flag: "🇧🇩" },
  { code: "+63", name: "Philippines", flag: "🇵🇭" },
  { code: "+44", name: "UK", flag: "🇬🇧" },
  { code: "+1", name: "USA/Canada", flag: "🇺🇸" },
  { code: "+86", name: "China", flag: "🇨🇳" },
  { code: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "+82", name: "South Korea", flag: "🇰🇷" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "+33", name: "France", flag: "🇫🇷" },
  { code: "+39", name: "Italy", flag: "🇮🇹" },
  { code: "+34", name: "Spain", flag: "🇪🇸" },
  { code: "+7", name: "Russia", flag: "🇷🇺" },
  { code: "+90", name: "Turkey", flag: "🇹🇷" },
  { code: "+55", name: "Brazil", flag: "🇧🇷" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "+27", name: "South Africa", flag: "🇿🇦" },
  { code: "+234", name: "Nigeria", flag: "🇳🇬" },
  { code: "+254", name: "Kenya", flag: "🇰🇪" },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  defaultCountry?: string;
}

export function PhoneInput({ 
  value, 
  onChange, 
  placeholder = "XX XXX XXXX",
  className,
  defaultCountry = "+971"
}: PhoneInputProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState(
    COUNTRIES.find(c => c.code === defaultCountry) || COUNTRIES[0]
  );
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Parse initial value
  React.useEffect(() => {
    if (value) {
      // Try to extract country code from value
      const matchedCountry = COUNTRIES.find(c => value.startsWith(c.code));
      if (matchedCountry) {
        setSelectedCountry(matchedCountry);
        setPhoneNumber(value.replace(matchedCountry.code, "").trim());
      } else {
        setPhoneNumber(value);
      }
    }
  }, []);

  // Update parent value when phone or country changes
  React.useEffect(() => {
    if (phoneNumber) {
      onChange(`${selectedCountry.code} ${phoneNumber}`);
    } else {
      onChange("");
    }
  }, [selectedCountry, phoneNumber]);

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and spaces
    const cleaned = e.target.value.replace(/[^\d\s]/g, "");
    setPhoneNumber(cleaned);
  };

  return (
    <div className={cn("relative flex", className)} ref={dropdownRef}>
      {/* Country Selector */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-2 border border-r-0 rounded-l-md bg-muted/50 hover:bg-muted transition-colors min-w-[100px]"
      >
        <span className="text-lg">{selectedCountry.flag}</span>
        <span className="text-sm font-medium">{selectedCountry.code}</span>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </button>

      {/* Phone Number Input */}
      <div className="relative flex-1">
        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          className="w-full h-full pl-10 pr-3 py-2 border rounded-r-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 text-sm"
        />
      </div>

      {/* Country Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 max-h-60 overflow-y-auto bg-background border rounded-lg shadow-lg z-50">
          {COUNTRIES.map((country) => (
            <button
              key={country.code}
              type="button"
              onClick={() => {
                setSelectedCountry(country);
                setIsOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 hover:bg-muted transition-colors text-left",
                selectedCountry.code === country.code && "bg-muted"
              )}
            >
              <span className="text-lg">{country.flag}</span>
              <span className="text-sm">{country.name}</span>
              <span className="text-sm text-muted-foreground ml-auto">{country.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
