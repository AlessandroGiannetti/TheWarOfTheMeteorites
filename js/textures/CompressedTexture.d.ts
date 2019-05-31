import {Texture} from './Texture';
import {Mapping, PixelFormat, TextureDataType, TextureEncoding, TextureFilter, Wrapping,} from '../constants';

export class CompressedTexture extends Texture {

    image: { width: number; height: number };

    constructor(
        mipmaps: ImageData[],
        width: number,
        height: number,
        format?: PixelFormat,
        type?: TextureDataType,
        mapping?: Mapping,
        wrapS?: Wrapping,
        wrapT?: Wrapping,
        magFilter?: TextureFilter,
        minFilter?: TextureFilter,
        anisotropy?: number,
        encoding?: TextureEncoding
    );

}
