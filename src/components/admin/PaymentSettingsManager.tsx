import { useState, useEffect } from "react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { 
  Loader2, 
  Save, 
  CreditCard, 
  Building2, 
  Globe, 
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon
} from "lucide-react";
import { MediaPicker } from "./MediaPicker";


const PaymentSettingsManager = () => {
  const { paymentGateways: contextPaymentGateways, refetch } = useSiteSettings();
  // Defensive: fallback to empty array if undefined/null
  const paymentGateways = Array.isArray(contextPaymentGateways) ? contextPaymentGateways : [];
  // Always include PayPal, Payoneer, Direct Bank, Credit/Debit Card, and COD gateways
  const ensureGateway = (arr, type, defaults) => {
    return arr.some(g => g.type === type)
      ? arr
      : [...arr, defaults];
  };

  let gatewaysList = paymentGateways;
  gatewaysList = ensureGateway(gatewaysList, 'paypal', {
    type: 'paypal',
    displayName: 'PayPal',
    enabled: false,
    config: { clientId: '', secret: '' },
    instructions: 'Pay with PayPal.'
  });
  gatewaysList = ensureGateway(gatewaysList, 'payoneer', {
    type: 'payoneer',
    displayName: 'Payoneer',
    enabled: false,
    config: { email: '' },
    instructions: 'Pay with Payoneer.'
  });
  gatewaysList = ensureGateway(gatewaysList, 'bank_transfer', {
    type: 'bank_transfer',
    displayName: 'Direct Bank Transfer',
    enabled: false,
    config: { bankName: '', accountNumber: '', iban: '', swift: '' },
    instructions: 'Transfer directly to our bank account.'
  });
  gatewaysList = ensureGateway(gatewaysList, 'stripe', {
    type: 'stripe',
    displayName: 'Credit/Debit Card',
    enabled: false,
    config: { publishableKey: '', secretKey: '' },
    instructions: 'Pay with credit or debit card.'
  });
  gatewaysList = ensureGateway(gatewaysList, 'cod', {
    type: 'cod',
    displayName: 'Cash on Delivery',
    enabled: true,
    config: {},
    instructions: 'Pay with cash upon delivery.'
  });
  const [gateways, setGateways] = useState<PaymentGatewaySettings[]>(gatewaysList);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let updated = paymentGateways;
    updated = ensureGateway(updated, 'paypal', {
      type: 'paypal',
      displayName: 'PayPal',
      enabled: false,
      config: { clientId: '', secret: '' },
      instructions: 'Pay with PayPal.'
    });
    updated = ensureGateway(updated, 'payoneer', {
      type: 'payoneer',
      displayName: 'Payoneer',
      enabled: false,
      config: { email: '' },
      instructions: 'Pay with Payoneer.'
    });
    updated = ensureGateway(updated, 'bank_transfer', {
      type: 'bank_transfer',
      displayName: 'Direct Bank Transfer',
      enabled: false,
      config: { bankName: '', accountNumber: '', iban: '', swift: '' },
      instructions: 'Transfer directly to our bank account.'
    });
    updated = ensureGateway(updated, 'stripe', {
      type: 'stripe',
      displayName: 'Credit/Debit Card',
      enabled: false,
      config: { publishableKey: '', secretKey: '' },
      instructions: 'Pay with credit or debit card.'
    });
    updated = ensureGateway(updated, 'cod', {
      type: 'cod',
      displayName: 'Cash on Delivery',
      enabled: true,
      config: {},
      instructions: 'Pay with cash upon delivery.'
    });
    setGateways(updated);
  }, [paymentGateways]);

  const saveGateways = async () => {
    setSaving(true);
    try {
      const { data: existing } = await supabase
        .from('site_settings')
        .select('id')
        .eq('setting_key', 'payment_gateways')
        .single();

      if (existing) {
        const { error } = await supabase
          .from('site_settings')
          .update({ setting_value: JSON.parse(JSON.stringify(gateways)) })
          .eq('setting_key', 'payment_gateways');
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('site_settings')
          .insert({ setting_key: 'payment_gateways', setting_value: JSON.parse(JSON.stringify(gateways)) });
        if (error) throw error;
      }
      toast.success('Payment gateways saved successfully');
      refetch();
    } catch (error) {
      console.error('Error saving gateways:', error);
      toast.error('Failed to save gateways');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Payment Gateway Settings
          </CardTitle>
          <CardDescription>
            Configure payment methods for your checkout. When enabled, these options will appear dynamically on the checkout page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {gateways.map((gateway, idx) => (
              <Card key={gateway.type} className="border p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      {gateway.type === 'paypal' && <Globe className="w-6 h-6 text-blue-600" />}
                      {gateway.type === 'stripe' && <CreditCard className="w-6 h-6 text-purple-600" />}
                      {gateway.type === 'payoneer' && <Globe className="w-6 h-6 text-orange-600" />}
                      {gateway.type === 'bank_transfer' && <Building2 className="w-6 h-6 text-green-600" />}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{gateway.displayName}</CardTitle>
                      <CardDescription>
                        {gateway.type === 'paypal' && 'Accept payments via PayPal'}
                        {gateway.type === 'stripe' && 'Accept credit/debit card payments'}
                        {gateway.type === 'payoneer' && 'Accept international payments'}
                        {gateway.type === 'bank_transfer' && 'Accept wire transfers and direct deposits'}
                        {gateway.type === 'cod' && 'Customer pays with cash upon delivery'}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {gateway.enabled ? (
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3 mr-1" /> Active
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        <AlertCircle className="w-3 h-3 mr-1" /> Inactive
                      </Badge>
                    )}
                    <Switch
                      checked={gateway.enabled}
                      onCheckedChange={checked => {
                        const updated = [...gateways];
                        updated[idx] = { ...gateway, enabled: checked };
                        setGateways(updated);
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Display Name</Label>
                    <Input
                      value={gateway.displayName}
                      onChange={e => {
                        const updated = [...gateways];
                        updated[idx] = { ...gateway, displayName: e.target.value };
                        setGateways(updated);
                      }}
                      placeholder="Gateway Name"
                      disabled={gateway.type === 'cod'}
                    />
                  </div>
                                    {gateway.type === 'cod' && (
                                      <div className="space-y-2 md:col-span-2">
                                        <Label>Instructions</Label>
                                        <Textarea
                                          value={gateway.instructions || ''}
                                          onChange={e => {
                                            const updated = [...gateways];
                                            updated[idx] = { ...gateway, instructions: e.target.value };
                                            setGateways(updated);
                                          }}
                                          placeholder="Instructions for Cash on Delivery (shown to customer)"
                                          rows={2}
                                        />
                                      </div>
                                    )}
                  {gateway.type === 'paypal' && (
                    <>
                      <div className="space-y-2">
                        <Label>Client ID</Label>
                        <Input
                          value={gateway.config.clientId || ''}
                          onChange={e => {
                            const updated = [...gateways];
                            updated[idx] = { ...gateway, config: { ...gateway.config, clientId: e.target.value } };
                            setGateways(updated);
                          }}
                          placeholder="Enter PayPal Client ID"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Secret</Label>
                        <Input
                          type="password"
                          value={gateway.config.secret || ''}
                          onChange={e => {
                            const updated = [...gateways];
                            updated[idx] = { ...gateway, config: { ...gateway.config, secret: e.target.value } };
                            setGateways(updated);
                          }}
                          placeholder="Enter PayPal Secret"
                        />
                      </div>
                    </>
                  )}
                  {gateway.type === 'stripe' && (
                    <>
                      <div className="space-y-2">
                        <Label>Publishable Key</Label>
                        <Input
                          value={gateway.config.publishableKey || ''}
                          onChange={e => {
                            const updated = [...gateways];
                            updated[idx] = { ...gateway, config: { ...gateway.config, publishableKey: e.target.value } };
                            setGateways(updated);
                          }}
                          placeholder="pk_..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Secret Key</Label>
                        <Input
                          type="password"
                          value={gateway.config.secretKey || ''}
                          onChange={e => {
                            const updated = [...gateways];
                            updated[idx] = { ...gateway, config: { ...gateway.config, secretKey: e.target.value } };
                            setGateways(updated);
                          }}
                          placeholder="sk_..."
                        />
                      </div>
                    </>
                  )}
                  {gateway.type === 'payoneer' && (
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        value={gateway.config.email || ''}
                        onChange={e => {
                          const updated = [...gateways];
                          updated[idx] = { ...gateway, config: { ...gateway.config, email: e.target.value } };
                          setGateways(updated);
                        }}
                        placeholder="Payoneer Email"
                      />
                    </div>
                  )}
                  {gateway.type === 'bank_transfer' && (
                    <>
                      <div className="space-y-2">
                        <Label>Bank Name</Label>
                        <Input
                          value={gateway.config.bankName || ''}
                          onChange={e => {
                            const updated = [...gateways];
                            updated[idx] = { ...gateway, config: { ...gateway.config, bankName: e.target.value } };
                            setGateways(updated);
                          }}
                          placeholder="Bank Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Account Number</Label>
                        <Input
                          value={gateway.config.accountNumber || ''}
                          onChange={e => {
                            const updated = [...gateways];
                            updated[idx] = { ...gateway, config: { ...gateway.config, accountNumber: e.target.value } };
                            setGateways(updated);
                          }}
                          placeholder="Account Number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>IBAN</Label>
                        <Input
                          value={gateway.config.iban || ''}
                          onChange={e => {
                            const updated = [...gateways];
                            updated[idx] = { ...gateway, config: { ...gateway.config, iban: e.target.value } };
                            setGateways(updated);
                          }}
                          placeholder="IBAN"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>SWIFT</Label>
                        <Input
                          value={gateway.config.swift || ''}
                          onChange={e => {
                            const updated = [...gateways];
                            updated[idx] = { ...gateway, config: { ...gateway.config, swift: e.target.value } };
                            setGateways(updated);
                          }}
                          placeholder="SWIFT Code"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Instructions</Label>
                        <Textarea
                          value={gateway.instructions || ''}
                          onChange={e => {
                            const updated = [...gateways];
                            updated[idx] = { ...gateway, instructions: e.target.value };
                            setGateways(updated);
                          }}
                          placeholder="Payment instructions for customers"
                          rows={2}
                        />
                      </div>
                    </>
                  )}
                </div>
              </Card>
            ))}
            <Button onClick={saveGateways} disabled={saving} className="w-full mt-6">
              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Payment Gateway Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSettingsManager;
