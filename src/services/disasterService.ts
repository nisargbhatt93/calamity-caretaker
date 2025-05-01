
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { DisasterInfo } from "@/components/DisasterCard";

export const getAllDisasters = async () => {
  try {
    const { data, error } = await supabase
      .from("disasters")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching disasters:", error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Error in getAllDisasters:", error);
    toast({
      title: "Error",
      description: "Failed to fetch disasters",
      variant: "destructive",
    });
    return [];
  }
};

export const getDisasterById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("disasters")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching disaster:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in getDisasterById:", error);
    toast({
      title: "Error",
      description: "Failed to fetch disaster details",
      variant: "destructive",
    });
    return null;
  }
};

export const addDisaster = async (disaster: Omit<DisasterInfo, "id">) => {
  try {
    const { data, error } = await supabase.from("disasters").insert([disaster]).select();

    if (error) {
      console.error("Error adding disaster:", error);
      toast({
        title: "Error",
        description: "Failed to add disaster information",
        variant: "destructive",
      });
      throw error;
    }

    toast({
      title: "Success",
      description: "Disaster information added successfully",
    });
    
    return data[0];
  } catch (error) {
    console.error("Error in addDisaster:", error);
    throw error;
  }
};
