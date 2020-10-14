type OptionValue = boolean|number|string;

type Option = {
    label: string;
    value: OptionValue;
}|OptionValue;

interface BaseParams {
    id?: string;
    type?: string;
    info?: string;
    default?: string;
    placeholder?: string;
    [key: string]: any;
}

interface TextParams extends BaseParams {
    type: 'text';
}

interface TextAreaParams extends BaseParams {
    type: 'textarea';
}

interface ImagePickerParams extends BaseParams {
    type: 'image_picker';
}

interface RadioParams extends Omit<BaseParams, 'default'> {
    default?: OptionValue;
    options: Option[],
    type: 'radio';
}

interface CheckboxParams extends Omit<BaseParams, 'default'> {
    default?: boolean;
    type: 'checkbox';
}

interface RangeParams extends Omit<BaseParams, 'default'> {
    default?: number;
    min: number;
    max: number;
    step: number;
    unit: string;
    type: 'range';
}

interface ColorParams extends BaseParams {
    type: 'color';
}

interface FontPickerParams extends BaseParams {
    type: 'font_picker';
}

interface CollectionParams extends BaseParams {
    type: 'collection';
}

interface ProductParams extends BaseParams {
    type: 'product';
}

interface BlogParams extends BaseParams {
    type: 'blog';
}

interface PageParams extends BaseParams {
    type: 'page';
}

interface LinkListParams extends BaseParams {
    type: 'link_list';
}

interface URLParams extends BaseParams {
    type: 'url';
}

interface VideoURLParams extends BaseParams {
    accept?: string[];
    type: 'video_url';
}

interface RichTextParams extends BaseParams {
    type: 'richtext';
}

interface HTMLParams extends BaseParams {
    type: 'html';
}

interface ArticleParams extends BaseParams {
    type: 'article';
}

interface BaseSchema {
    label: string;
    id: string;
    type: string;
    info?: string;
    default?: string;
    placeholder?: string;
    options?: Option[];
    [key: string]: any;
}

interface TextSchema extends BaseSchema {
    type: 'text';
}

interface TextAreaSchema extends BaseSchema {
    type: 'textarea';
}

interface ImagePickerSchema extends BaseSchema {
    type: 'image_picker';
}

interface RadioSchema extends Omit<BaseSchema, 'default'> {
    default?: OptionValue;
    options: Option[],
    type: 'radio';
}

interface CheckboxSchema extends Omit<BaseSchema, 'default'> {
    default: boolean;
    type: 'checkbox';
}

interface RangeSchema extends Omit<BaseSchema, 'default'> {
    default: number;
    min: number;
    max: number;
    step: number;
    unit: string;
    type: 'range';
}

interface ColorSchema extends BaseSchema {
    type: 'color';
}

interface FontPickerSchema extends BaseSchema {
    type: 'font_picker';
}

interface CollectionSchema extends BaseSchema {
    type: 'collection';
}

interface ProductSchema extends BaseSchema {
    type: 'product';
}

interface BlogSchema extends BaseSchema {
    type: 'blog';
}

interface PageSchema extends BaseSchema {
    type: 'page';
}

interface LinkListSchema extends BaseSchema {
    type: 'link_list';
}

interface URLSchema extends BaseSchema {
    type: 'url';
}

interface VideoURLSchema extends BaseSchema {
    accept?: string[];
    type: 'video_url';
}

interface RichTextSchema extends BaseSchema {
    type: 'richtext';
}

interface HTMLSchema extends BaseSchema {
    type: 'html';
}

interface ArticleSchema extends BaseSchema {
    type: 'article';
}

function createOption(label: string, options: TextParams): TextSchema;
function createOption(label: string, options: TextAreaParams): TextAreaSchema;
function createOption(label: string, options: ImagePickerParams): ImagePickerSchema;
function createOption(label: string, options: RadioParams): RadioSchema;
function createOption(label: string, options: CheckboxParams): CheckboxSchema;
function createOption(label: string, options: RangeParams): RangeSchema;
function createOption(label: string, options: ColorParams): ColorSchema;
function createOption(label: string, options: FontPickerParams): FontPickerSchema;
function createOption(label: string, options: CollectionParams): CollectionSchema;
function createOption(label: string, options: ProductParams): ProductSchema;
function createOption(label: string, options: BlogParams): BlogSchema;
function createOption(label: string, options: PageParams): PageSchema;
function createOption(label: string, options: LinkListParams): LinkListSchema;
function createOption(label: string, options: URLParams): URLSchema;
function createOption(label: string, options: VideoURLParams): VideoURLSchema;
function createOption(label: string, options: RichTextParams): RichTextSchema;
function createOption(label: string, options: HTMLParams): HTMLSchema;
function createOption(label: string, options: ArticleParams): ArticleSchema;
function createOption(label: string, {type = 'text', ...options}: any): any {
    const id = options.id || label.replace(/ /g, '').replace(/\W/g, '');
    return  {
        ...options,
        label,
        id,
        type,
    };
};
