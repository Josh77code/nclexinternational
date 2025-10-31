'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

export default function UploadQuestionsPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const router = useRouter()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null
    setFile(f)
  }

  const onSubmit = async () => {
    if (!file) return
    setIsUploading(true)
    setResult(null)
    try {
      const fd = new FormData()
      fd.append('file', file)
      
      // Get upload token if configured (optional security)
      const uploadToken = process.env.NEXT_PUBLIC_UPLOAD_TOKEN
      const headers: HeadersInit = {}
      if (uploadToken) {
        headers['x-upload-token'] = uploadToken
      }
      
      const res = await fetch('/api/questions/upload', {
        method: 'POST',
        headers,
        body: fd,
      })
      const data = await res.json()
      setResult({ ok: res.ok, data })
    } catch (error: any) {
      setResult({ ok: false, data: { error: error?.message || 'Upload failed' } })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-4">
          <Card className="border-2 border-[#3895D3]">
            <CardHeader>
              <CardTitle className="text-2xl text-[#072F5F]">Upload Weekly Questions (CSV)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700">
                Use the CSV template to add questions weekly. Required columns: question_text, option_a, option_b, option_c, option_d, correct_answer (A/B/C/D). Optional: explanation, category, difficulty_level (easy/medium/hard).
              </p>
              <div className="flex items-center gap-3">
                <Input type="file" accept=".csv" onChange={onChange} />
                <Button onClick={() => router.push('/questions-template.csv')} variant="outline" className="border-2 border-[#3895D3] text-[#3895D3]">Download Template</Button>
              </div>
              <div className="flex gap-3">
                <Button disabled={!file || isUploading} onClick={onSubmit} className="bg-[#3895D3] hover:bg-[#1261A0]">
                  {isUploading ? 'Uploading...' : 'Upload CSV'}
                </Button>
              </div>
              {result && (
                <div className={`mt-4 p-3 rounded border ${result.ok ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(result.data, null, 2)}</pre>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}


