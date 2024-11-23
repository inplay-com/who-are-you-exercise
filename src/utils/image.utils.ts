import axios from 'axios';
import sharp from 'sharp';

export const blurImage = async (imagePath:string,blurAmount:number) : Promise<Buffer> =>{
    const response = await axios.get(imagePath, { responseType: 'arraybuffer' });
    const imageBuffer = getBuferFromImage(response.data);
    return sharp(imageBuffer).blur(blurAmount).toBuffer();
}

export const generateBase64ImageFromBuffer = (imageData:Buffer|String) : string =>{
    const buffer = getBuferFromImage(imageData) 
    const base64Image = buffer.toString('base64')
    return `data:image/jpeg;base64,${base64Image}`;
}

export const getBuferFromImage = (imageData:Buffer|String):Buffer => {
    return Buffer.from(imageData)
}