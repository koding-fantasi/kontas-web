import Anthropic from '@anthropic-ai/sdk'
import { KONTAS_DOCS_PROMPT } from '../constants/ai-prompts'

const CLAUDE_API_KEY = process.env.AI_API_KEY

// Base AI function
// askClaude adalah function untuk mengirim pesan ke Claude dan bisa kita pakai berkali-kali, contohnya export yang ada di bawah
const askClaude = async (messages, systemPrompt = '') => {
    const ai = new Anthropic({
        apiKey: CLAUDE_API_KEY,
        dangerouslyAllowBrowser: true
    })

    const msg = await ai.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        system: systemPrompt,
        messages
    })
    
    // console.log('Full Claude Response:', msg)
    return msg.content[0].text
}

// Function untuk generate description
export const generateDescription = async (imageBase64, title = 'produk seni') => {
    const PRODUCT_PROMPT = `
    
    Tolong analisis gambar ini dan buatkan deskripsi produk dengan format:
    1. Deskripsi detail tentang produk (bentuk, warna, material)
    2. Keunikan dan nilai seni
    3. Potensi penggunaan/penempatan
    4. Jika ada gambar orang dan pakaian dan lain lain, buat deskripsi dari berbagai sudut pandang!
    
    - Berikan outputnya dalam bentuk text saja!
    - Tidak apa-apa deskripsinya menjadi sangat panjang, bahkan kalau perlu buat menjadi sangat panjang!
    - Jangan lupa emoji atau sesuatu yg membuat deskripsi ini menjadi terasa lebih menarik dan mengesankan!
    - Jangan ada seperti judul bahwa "Deskripsi Produk: " atau sejenisnya, cukup deskripsi saja!
    - Tidak perlu juga ada kata-kata seolah anda sedang menulis sebuah proposal dan menganalisa gambar!
    
    karena sekarang posisinya ada di dalam input deskripsi pada form di website ini!
    
    `

    const messages = [
        {
            role: "user",
            content: [
                {
                    type: "image",
                    source: {
                        type: "base64",
                        media_type: "image/jpeg",
                        data: imageBase64
                    }
                },
                {
                    type: "text",
                    text: `${PRODUCT_PROMPT} untuk: ${title}`
                }
            ]
        }
    ]
    
    return askClaude(messages)
}

// Contoh function lain yg pake askClaude
export const analyzeImage = async (imageBase64) => {
    const ANALYSIS_PROMPT = `
    
    Tolong analisis gambar ini dan jelaskan teknik pembuatan karya seni ini:
    1. Lihat dari segi (bentuk, warna, material)
    2. Keunikan dan nilai seni
    3. Potensi penggunaan/penempatan
    4. Jika ada gambar orang dan pakaian dan lain lain, buat deskripsi dari berbagai sudut pandang!
    5. Potensi harga jual di 10 tahun mendatang
    
    - Berikan outputnya dalam bentuk text saja!
    - Ini adalah sebuat art!
    - Untuk harga dalam format harga Indonesia!
    - Harga yg dimaksud disini adalah harga seni itu, bukan ukuran, jumlah cetak atau yg lainnya!, tapi murni harga karya seni itu!
    - Harga yg anda berikan adalah harga masa depan 10 tahun mendatang saja! jangan harga sekarang!
    
    `
    
    const messages = [
        {
            role: "user",
            content: [
                {
                    type: "image",
                    source: {
                        type: "base64",
                        media_type: "image/jpeg",
                        data: imageBase64
                    }
                },
                {
                    type: "text",
                    text: `${ANALYSIS_PROMPT}`
                }
            ]
        }
    ]
    
    return askClaude(messages)
}

export const askPerformance = async (message, chatHistory = []) => {
    const PERFORMANCE_PROMPT = `
    RULES:
    Sebelumnya saya ingin menjelaskan, bahwa ini adalah aplikasi untuk booking gedung olahraga, tetapi diintegrasikan dengan AI.
    Jadi, sebelum menjawab, pastikan jawaban anda sudah sesuai dengan aplikasi ini!

    yg anda dapat lakukan adalah:
    - Memberikan rekomendasi gedung olahraga
    - Memberikan rekomendasi waktu booking gedung olahraga
    Tapi untuk sementara jawablah kalau anda lagi dalam mode pengembangan! sehingga belum bisa memberikan saran dan rekomendasi!

    - nama anda adalah CourtMind-AI, jadi jika ada yg bertanya, jawab seolah anda adalah CourtMind-AI!
    - Jawaban harus dalam bahasa Indonesia dan tidak perlu sopan ! pakai bahasa sehari-hari saja !!! tapi jangan pernah pakai kata loe gue atau semacamnya yg sangat lebay !!!
    - Jangan lupa pakai emoji!
    - Jangan lupa pakai tanda '...' agar terasa lebih natural!
    `

    // Convert chat history to Claude format
    const formattedHistory = chatHistory.map(msg => ({
        role: msg.isUser ? "user" : "assistant",
        content: [{ type: "text", text: msg.text }]
    }))

    const messages = [
        ...formattedHistory,
        {
            role: "user",
            content: [{ type: "text", text: message }]
        }
    ]
    
    return askClaude(messages, PERFORMANCE_PROMPT)
}

export const searchDocs = async (query, chatHistory = []) => {
    // Convert chat history to Claude format
    const formattedHistory = chatHistory.map(msg => ({
        role: msg.isUser ? "user" : "assistant",
        content: [{ type: "text", text: msg.text }]
    }))

    const messages = [
        ...formattedHistory,
        {
            role: "user",
            content: [{ type: "text", text: query }]
        }
    ]
    
    return askClaude(messages, KONTAS_DOCS_PROMPT) 
}

//! tinggal buat export const function lagi kalau mau nambah function AI baru