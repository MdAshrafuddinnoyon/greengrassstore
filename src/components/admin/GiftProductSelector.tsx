import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, X } from "lucide-react";

interface Product {
  id: string;
  name: string;
  name_ar?: string;
  price: number;
  featured_image?: string;
  slug: string;
  category?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface GiftProductSelectorProps {
  selected: Product[];
  onChange: (items: Product[]) => void;
  productsLimit: number;
  selectedCategorySlug?: string;
  onCategoryChange?: (slug: string) => void;
}

export const GiftProductSelector = ({ 
  selected, 
  onChange, 
  productsLimit,
  selectedCategorySlug,
  onCategoryChange 
}: GiftProductSelectorProps) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>(selectedCategorySlug || "");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, slug')
        .eq('is_active', true)
        .order('display_order');
      
      if (!error && data) {
        setCategories(data);
      }
    };
    fetchCategories();

    // Real-time subscription for categories
    const channel = supabase
      .channel('gift-selector-categories')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'categories' },
        () => {
          fetchCategories();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Fetch products based on category filter
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let query = supabase
        .from('products')
        .select('id, name, name_ar, price, featured_image, slug, category, subcategory, tags')
        .eq('is_active', true)
        .limit(100);
      
      const { data, error } = await query;
      
      if (!error && data) {
        let filtered = data;
        
        // If category filter is set, filter by that category
        if (categoryFilter) {
          filtered = data.filter((product: any) => {
            const categoryLower = product.category?.toLowerCase() || '';
            const subcategoryLower = product.subcategory?.toLowerCase() || '';
            return categoryLower === categoryFilter.toLowerCase() || 
                   subcategoryLower === categoryFilter.toLowerCase();
          });
        } else {
          // Default: filter by gift category/tag
          filtered = data.filter((product: any) => {
            const categoryLower = product.category?.toLowerCase() || '';
            const subcategoryLower = product.subcategory?.toLowerCase() || '';
            const categoryMatch = categoryLower.includes('gift') || categoryLower === 'gifts';
            const subcategoryMatch = subcategoryLower.includes('gift') || subcategoryLower === 'gifts';
            const tagsMatch = product.tags?.some((tag: string) => 
              tag.toLowerCase().includes('gift') || tag.toLowerCase() === 'gifts'
            );
            return categoryMatch || subcategoryMatch || tagsMatch;
          });
        }
        
        setAllProducts(filtered);
      }
      setLoading(false);
    };
    
    fetchProducts();
  }, [categoryFilter]);

  // Update parent when category changes
  useEffect(() => {
    if (onCategoryChange && categoryFilter) {
      onCategoryChange(categoryFilter);
    }
  }, [categoryFilter, onCategoryChange]);

  // Remove from available if already selected
  const available = allProducts.filter(p => !selected.some(s => s.id === p.id));

  const handleAdd = (product: Product) => {
    if (selected.length < productsLimit) {
      onChange([...selected, product]);
    }
  };

  const handleRemove = (id: string) => {
    onChange(selected.filter(p => p.id !== id));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(selected);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    onChange(reordered);
  };

  return (
    <div className="space-y-4">
      {/* Category Selection */}
      <div className="space-y-2">
        <Label>Select Category for Gift Products</Label>
        <Select 
          value={categoryFilter} 
          onValueChange={(value) => setCategoryFilter(value === "_all_" ? "" : value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Auto-select from Gift category/tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_all_">Auto-select (Gift category/tag)</SelectItem>
            {categories.map(cat => (
              <SelectItem key={cat.id} value={cat.slug}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Choose a category to filter products, or leave as auto to use products with "gift" in category/tag
        </p>
      </div>

      {/* Available Products */}
      <div>
        <Label className="text-sm mb-2 block">Available Products ({available.length})</Label>
        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 border rounded-lg bg-muted/20">
          {loading ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading products...
            </div>
          ) : available.length === 0 ? (
            <span className="text-xs text-muted-foreground">
              {categoryFilter ? `No products found in "${categoryFilter}" category` : "No gift products found"}
            </span>
          ) : (
            available.map(product => (
              <Button 
                key={product.id} 
                size="sm" 
                variant="outline" 
                onClick={() => handleAdd(product)}
                disabled={selected.length >= productsLimit}
                className="gap-1"
              >
                <Plus className="w-3 h-3" />
                {product.name}
              </Button>
            ))
          )}
        </div>
      </div>

      {/* Selected Products */}
      <div>
        <Label className="text-sm mb-2 block">
          Selected Products ({selected.length}/{productsLimit}) - Drag to reorder
        </Label>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="selected-gift-products" direction="horizontal">
            {(provided) => (
              <div 
                ref={provided.innerRef} 
                {...provided.droppableProps} 
                className="flex gap-2 flex-wrap min-h-[80px] p-3 border-2 border-dashed rounded-lg bg-muted/10"
              >
                {selected.length === 0 ? (
                  <span className="text-xs text-muted-foreground">
                    Select products above or leave empty to auto-select
                  </span>
                ) : (
                  selected.map((product, idx) => (
                    <Draggable key={product.id} draggableId={product.id} index={idx}>
                      {(dragProvided) => (
                        <div
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                          className="flex items-center gap-2 p-2 border rounded bg-background shadow-sm cursor-move"
                        >
                          {product.featured_image && (
                            <img 
                              src={product.featured_image} 
                              alt={product.name}
                              className="w-8 h-8 object-cover rounded"
                            />
                          )}
                          <span className="text-sm font-medium">{product.name}</span>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-6 w-6 text-destructive hover:text-destructive"
                            onClick={() => handleRemove(product.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};
