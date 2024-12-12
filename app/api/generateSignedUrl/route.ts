import { auth } from "@/auth";
import { supabase } from "@/lib/supabase-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: "Not Authenticated!" },
        { status: 401 }
      );
    }

    const { fileName, fileType, filePath } = await req.json();

    if (!fileName || !fileType) {
      return NextResponse.json(
        { error: "Invalid file name or type" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.storage
      .from("epub-files")
      .createSignedUploadUrl(filePath);

    if (error) {
      console.error("Supabase Error:", error.message);
      return NextResponse.json(
        { error: error.message || "Failed to generate signed URL" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      signedUrl: data.signedUrl,
    });
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
