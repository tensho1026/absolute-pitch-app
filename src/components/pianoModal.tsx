"use client";

import { useState } from "react";
import { HelpCircle } from "lucide-react";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
// import { Button } from "./ui/button"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function PianoHelpModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='absolute top-4 right-4 z-10'
          aria-label='使い方を表示'
        >
          <HelpCircle className='h-15 w-15' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>ピアノアプリの使い方</DialogTitle>
          <DialogDescription>
            このアプリの基本的な使い方について説明します。
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <p>ここにピアノアプリの使い方の説明を記載します。</p>
          <ul className='list-disc pl-5 space-y-2'>
            <li>鍵盤をクリックして音を鳴らす</li>
            <li>楽譜に従って演奏する</li>
            <li>右側のサウンドコントロールで音質を調整する</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
