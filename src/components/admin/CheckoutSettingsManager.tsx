import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CheckoutSettings {
  enableCardPayment: boolean;
  enableWhatsappOrder: boolean;
  enableCashOnDelivery: boolean;
}

const defaultSettings: CheckoutSettings = {
  enableCardPayment: true,
  enableWhatsappOrder: true,
  enableCashOnDelivery: true,
};

export const CheckoutSettingsManager = () => {
  const [settings, setSettings] = useState<CheckoutSettings>(defaultSettings);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("setting_value")
        .eq("setting_key", "checkout_settings")
        .maybeSingle();
      if (data?.setting_value) {
        setSettings({ ...defaultSettings, ...data.setting_value });
      }
      if (error) throw error;
    } catch (e) {
      toast.error("Failed to load checkout settings");
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("site_settings")
        .upsert({
          setting_key: "checkout_settings",
          setting_value: settings,
        }, { onConflict: ["setting_key"] });
      if (error) throw error;
      toast.success("Checkout settings saved");
    } catch (e) {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Checkout Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Switch
            checked={settings.enableCardPayment}
            onCheckedChange={v => setSettings(s => ({ ...s, enableCardPayment: v }))}
            id="card-payment"
          />
          <Label htmlFor="card-payment">Enable Card/Online Payment</Label>
        </div>
        <div className="flex items-center gap-4">
          <Switch
            checked={settings.enableWhatsappOrder}
            onCheckedChange={v => setSettings(s => ({ ...s, enableWhatsappOrder: v }))}
            id="whatsapp-order"
          />
          <Label htmlFor="whatsapp-order">Enable WhatsApp Order</Label>
        </div>
        <div className="flex items-center gap-4">
          <Switch
            checked={settings.enableCashOnDelivery}
            onCheckedChange={v => setSettings(s => ({ ...s, enableCashOnDelivery: v }))}
            id="cod"
          />
          <Label htmlFor="cod">Enable Cash on Delivery</Label>
        </div>
        <Button onClick={saveSettings} disabled={saving} className="mt-4">
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </CardContent>
    </Card>
  );
};
