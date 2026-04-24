---
name: algorithmic-art
description: Generate algorithmic art with various generative models and artistic styles

---

## Algorithmic Art Skill

A comprehensive skill for creating algorithmic art using multiple generative models and artistic styles. This skill allows you to generate images from text descriptions, code, mathematical functions, or user-provided parameters.

## Tools

### 1. Generate Image from Text
Generate an image from a text description using advanced diffusion models.

```python
generate_image_from_text(
    prompt: str, 
    model: str = "advanced_diffusion",
    style: str = "photorealistic",
    aspect_ratio: str = "1:1",
    seed: int = None,
    parameters: dict = None
) -> dict
```

**Parameters:**
- `prompt`: Text description of the desired image
- `model`: Model to use ('advanced_diffusion', 'stable_diffusion', 'midjourney_v6', 'dall_e_3')
- `style`: Artistic style ('photorealistic', 'cartoon', 'oil_painting', 'watercolor', 'anime', 'abstract', '3d_render', 'pencil_sketch', 'pixel_art', 'cyberpunk', 'fantasy')
- `aspect_ratio`: Aspect ratio of the image ('1:1', '4:3', '3:4', '16:9', '9:16', '21:9', '9:21')
- `seed`: Random seed for reproducibility (optional)
- `parameters`: Additional model-specific parameters (optional)

**Returns:**
- Image ID, URL, and generation metadata

### 2. Generate Image from Code
Generate an image from programming code (e.g., Processing, p5.js, GLSL).

```python
generate_image_from_code(
    code: str, 
    language: str = "processing",
    resolution: str = "1024x1024",
    iterations: int = 1,
    seed: int = None,
    parameters: dict = None
) -> dict
```

**Parameters:**
- `code`: Code to visualize
- `language`: Programming language ('processing', 'p5js', 'glsl', 'python_turtle', 'openframeworks')
- `resolution`: Output resolution ('1024x1024', '800x600', '1920x1080', etc.)
- `iterations`: Number of images to generate (for variations)
- `seed`: Random seed for reproducibility (optional)
- `parameters`: Additional code execution parameters (optional)

**Returns:**
- Image ID, URL, and code execution metadata

### 3. Generate Image from Mathematical Function
Generate images from mathematical functions or formulas.

```python
generate_image_from_function(
    function: str, 
    domain: dict = {'x_min': -10, 'x_max': 10, 'y_min': -10, 'y_max': 10},
    resolution: str = "1024x1024",
    color_map: str = "viridis",
    seed: int = None,
    parameters: dict = None
) -> dict
```

**Parameters:**
- `function`: Mathematical function (e.g., "sin(sqrt(x^2 + y^2))")
- `domain`: Domain for x and y values
- `resolution`: Output resolution
- `color_map`: Color map to use ('viridis', 'plasma', 'inferno', 'magma', 'cividis', 'grayscale', 'custom')
- `seed`: Random seed (optional)
- `parameters`: Additional function parameters (optional)

**Returns:**
- Image ID, URL, and mathematical details

### 4. Generate Fractals
Generate fractal images using various fractal algorithms.

```python
generate_fractals(
    fractal_type: str, 
    iterations: int = 100,
    resolution: str = "1024x1024",
    zoom: float = 1.0,
    offset: dict = {'x': 0, 'y': 0},
    palette: list = None,
    seed: int = None
) -> dict
```

**Parameters:**
- `fractal_type`: Fractal type ('mandelbrot', 'julia', 'sierpinski', 'lyapunov', 'newton_fractal', 'flame_fractal', 'burningship')
- `iterations`: Maximum iterations for calculation
- `resolution`: Output resolution
- `zoom`: Zoom level for fractal
- `offset`: Offset for viewing area
- `palette`: Custom color palette (array of hex colors)
- `seed`: Random seed (optional)

**Returns:**
- Image ID, URL, and fractal parameters

### 5. Generate Geometric Patterns
Create geometric patterns using mathematical principles.

```python
generate_geometric_patterns(
    pattern_type: str, 
    dimensions: dict,
    resolution: str = "1024x1024",
    color_scheme: dict = None,
    seed: int = None,
    parameters: dict = None
) -> dict
```

**Parameters:**
- `pattern_type`: Pattern type ('tiling', 'mosaic', 'grid', 'fractal_geometry', 'spiral', 'polytope', 'voronoi')
- `dimensions`: Pattern dimensions (width, height, tile_size)
- `resolution`: Output resolution
- `color_scheme`: Color scheme definition (optional)
- `seed`: Random seed (optional)
- `parameters`: Additional pattern parameters (optional)

**Returns:**
- Image ID, URL, and pattern details

### 6. Create Style Transfer
Apply artistic style from one image to another.

```python
create_style_transfer(
    content_image: str,
    style_image: str,
    model: str = "neural_style_transfer",
    strength: float = 0.75,
    iterations: int = 500,
    parameters: dict = None
) -> dict
```

**Parameters:**
- `content_image`: URL or ID of content image
- `style_image`: URL or ID of style image
- `model`: Model to use ('neural_style_transfer', 'fast_transfer', 'custom_model')
- `strength`: Style strength (0.0 to 1.0)
- `iterations`: Number of optimization iterations
- `parameters`: Additional model parameters (optional)

**Returns:**
- Transferred image ID and URL

### 7. Generate Variations
Create variations of an existing image.

```python
generate_variations(
    image_id: str, 
    num_variations: int = 4,
    variation_type: str = "minor",
    variation_parameters: dict = None
) -> list
```

**Parameters:**
- `image_id`: Original image ID
- `num_variations`: Number of variations to generate
- `variation_type`: Type of variation ('minor', 'moderate', 'drastic', 'style_only', 'content_only')
- `variation_parameters`: Specific variation parameters (optional)

**Returns:**
- List of variation image IDs and URLs

### 8. Image-to-Image Transformation
Transform an image based on a text prompt.

```python
image_to_image_transformation(
    image_id: str, 
    prompt: str,
    strength: float = 0.7,
    model: str = "advanced_diffusion",
    style: str = None,
    parameters: dict = None
) -> dict
```

**Parameters:**
- `image_id`: Image to transform
- `prompt`: Transformation description
- `strength`: Transformation strength (0.0 to 1.0)
- `model`: Model to use
- `style`: Target style (optional)
- `parameters`: Additional parameters (optional)

**Returns:**
- Transformed image ID and URL

### 9. Generate Animated GIFs
Create animated GIFs from sequences or videos.

```python
generate_animated_gif(
    source: str,  # Can be image IDs, video URL, or parameters
    animation_type: str = "sequence",
    duration: float = None,
    loop: bool = True,
    fps: int = 10,
    parameters: dict = None
) -> dict
```

**Parameters:**
- `source`: Source of animation (image IDs array, video URL, or generation parameters)
- `animation_type`: Type of animation ('sequence', 'looping', 'ping_pong', 'travel')
- `duration`: Duration of GIF in seconds (optional)
- `loop`: Whether GIF should loop (optional)
- `fps`: Frames per second (optional)
- `parameters`: Additional animation parameters (optional)

**Returns:**
- Animated GIF ID, URL, and preview

### 10. Generate 3D Artwork
Generate 3D models or renders using AI.

```python
generate_3d_artwork(
    prompt: str,
    model: str = "diffusion_3d",
    resolution: str = "1k",
    art_style: str = "realistic",
    parameters: dict = None
) -> dict
```

**Parameters:**
- `prompt`: Text description of 3D artwork
- `model`: 3D generation model
- `resolution`: Resolution ('512', '1k', '2k', '4k')
- `art_style`: Artistic style ('realistic', 'stylized', 'abstract', 'low_poly', 'voxel', 'sketch')
- `parameters`: Additional model parameters (optional)

**Returns:**
- 3D model ID, preview image, and download URL

### 11. Create Geometric Patterns
Generate complex geometric patterns and tessellations.

```python
create_geometric_pattern(
    pattern_type: str,
    dimensions: dict,
    symmetry_order: int = None,
    color_palette: list = None,
    parameters: dict = None
) -> dict
```

**Parameters:**
- `pattern_type`: Geometric pattern type ('tessellation', 'wallpaper', 'fractal', 'mandala', 'polygon_grid', 'kaleidoscope')
- `dimensions`: Pattern dimensions (width, height)
- `symmetry_order`: Symmetry order (e.g., 4 for square, 6 for hexagonal)
- `color_palette`: Color palette for the pattern
- `parameters`: Additional pattern parameters (optional)

**Returns:**
- Pattern ID and generated image

### 12. Create Algorithmic Animations
Generate complex algorithmic animations.

```python
create_algorithmic_animation(
    algorithm: str,
    duration: float,
    resolution: str = "1080p",
    fps: int = 30,
    seed: int = None,
    parameters: dict = None
) -> dict
```

**Parameters:**
- `algorithm`: Animation algorithm ('fractal_evolution', 'cellular_automata', 'particle_system', 'geometric_morphing', 'noise_animation')
- `duration`: Animation duration in seconds
- `resolution`: Video resolution
- `fps`: Frames per second
- `seed`: Random seed (optional)
- `parameters`: Additional algorithm parameters (optional)

**Returns:**
- Animation ID and video file

### 13. Generate AI Art Portfolio
Create a professional portfolio of AI-generated art.

```python
create_portfolio(
    name: str,
    description: str = "",
    art_categories: list = [],
    layout: str = "masonry",
    theme: str = "dark",
    visibility: str = "public"
) -> dict
```

**Parameters:**
- `name`: Portfolio name
- `description`: Portfolio description
- `art_categories`: List of art categories
- `layout`: Gallery layout ('masonry', 'grid', 'slideshow', 'carousel')
- `theme`: Portfolio theme ('dark', 'light', 'minimal', 'creative', 'premium')
- `visibility`: Visibility ('public', 'private', 'unlisted')

**Returns:**
- Portfolio ID and access link

### 14. Create AI Art Collections
Organize artwork into curated collections.

```python
create_collection(
    collection_name: str,
    art_ids: list = [],
    description: str = "",
    collection_type: str = "curated",
    tags: list = []
) -> dict
```

**Parameters:**
- `collection_name`: Name of the collection
- `art_ids`: List of art IDs to include
- `description`: Collection description
- `collection_type`: Collection type ('curated', 'themed', 'chronological', 'experimental')
- `tags`: Tags for the collection

**Returns:**
- Collection ID and preview

### 15. Set Art Metadata
Set detailed metadata for artwork.

```python
set_art_metadata(
    art_id: str,
    metadata: dict,
    update_mode: str = "merge"
) -> dict
```

**Parameters:**
- `art_id`: ID of the artwork
- `metadata`: Metadata dictionary (title, description, creation_date, artist, inspiration, technical_details)
- `update_mode`: Update mode ('merge', 'replace', 'append')

**Returns:**
- Updated metadata

### 16. Optimize Artwork
Optimize artwork for web or print.

```python
optimize_artwork(
    art_id: str,
    optimization_type: str = "web",
    max_size: int = None,
    quality: int = 80,
    format: str = "auto"
) -> dict
```

**Parameters:**
- `art_id`: ID of the artwork
- `optimization_type`: 'web' for web, 'print' for print, 'lossless' for lossless
- `max_size`: Maximum file size in KB (optional)
- `quality`: Quality level (0-100)
- `format`: Output format (auto, jpeg, png, webp)

**Returns:**
- Optimized file URL and size

### 17. Generate Art-Based NFTs
Create NFTs from AI-generated artwork.

```python
create_nft(
    art_id: str,
    blockchain: str = "ethereum",
    wallet_address: str,
    mint_price: float = 0.01,
    royalty_percentage: float = 10.0,
    description: str = "",
    properties: dict = {}
) -> dict
```

**Parameters:**
- `art_id`: ID of the artwork
- `blockchain`: Blockchain network
- `wallet_address`: Wallet address for minting
- `mint_price`: Price in cryptocurrency
- `royalty_percentage`: Royalty percentage
- `description`: NFT description
- `properties`: NFT properties metadata

**Returns:**
- NFT details and transaction hash

### 18. Generate Art-Based Stories
Create stories inspired by artwork.

```python
generate_art_story(
    art_id: str,
    story_style: str = "narrative",
    length: str = "medium",
    perspective: str = "third_person",
    tone: str = "neutral",
    parameters: dict = None
) -> dict
```

**Parameters:**
- `art_id`: ID of the artwork
- `story_style`: Story style ('narrative', 'poetic', 'descriptive', 'experimental')
- `length`: Story length ('short', 'medium', 'long')
- `perspective`: Narrative perspective
- `tone`: Story tone
- `parameters`: Additional parameters (optional)

**Returns:**
- Story text and audio narration (optional)

### 19. Generate Art-Based Music
Create music inspired by artwork.

```python
generate_art_music(
    art_id: str,
    music_genre: str = "ambient",
    duration: float = 180,
    mood: str = "calm",
    tempo: int = 100,
    instrumentation: list = None
) -> dict

**Parameters:**
- `art_id`: ID of the artwork
- `music_genre`: Music genre
- `duration`: Song duration in seconds
- `mood`: Musical mood
- `tempo`: Beats per minute
- `instrumentation`: List of instruments (optional)

**Returns:**
- Music track URL and metadata

### 20. Generate Art-Based Animation
Create animations inspired by artwork.

```python
generate_art_animation(
    art_id: str,
    animation_type: str = "loop",
    duration: float = 5,
    style: str = "artistic",
    resolution: str = "1080p",
    parameters: dict = None
) -> dict

**Parameters:**
- `art_id`: ID of the artwork
- `animation_type`: 'loop', 'sequence', 'morphing', 'transition'
- `duration`: Animation duration in seconds
- `style`: Animation style
- `resolution`: Video resolution
- `parameters`: Additional parameters (optional)

**Returns:**
- Animation file URL and thumbnail

### 21. Generate Art-Based Games
Create simple games inspired by artwork.

```python
generate_art_game(
    art_id: str,
    game_type: str = "puzzle",
    platform: str = "web",
    complexity: str = "medium",
    theme: str = "matching",
    parameters: dict = None
) -> dict

**Parameters:**
- `art_id`: ID of the artwork
- `game_type`: 'puzzle', 'memory', 'quiz', 'runner', 'platformer'
- `platform`: Target platform ('web', 'mobile')
- `complexity`: 'easy', 'medium', 'hard'
- `theme`: Game theme (derived from artwork)
- `parameters`: Additional parameters (optional)

**Returns:**
- Game package URL and play link

### 22. Generate Art-Based VR/AR Experience
Create immersive experiences based on artwork.

```python
generate_art_vr_ar(
    art_id: str,
    experience_type: str = "vr",
    platform: str = "vr_headset",
    interaction_model: str = "gaze",
    environment: str = "gallery",
    parameters: dict = None
) -> dict

**Parameters:**
- `art_id`: ID of the artwork
- `experience_type`: 'vr', 'ar', 'mixed_reality'
- `platform`: Target platform
- `interaction_model`: 'gaze', 'controller', 'voice', 'gesture'
- `environment`: Virtual environment
- `parameters`: Additional parameters (optional)

**Returns:**
- Experience package and launch instructions

### 23. Generate Art-Based Interactive Installations
Create interactive installations for physical spaces.

```python
generate_art_installation(
    art_id: str,
    installation_type: str = "reactive",
    interaction_method: str = "touch",
    sensors_required: list = None,
    duration: float = None,
    space_requirements: dict = None,
    parameters: dict = None
) -> dict

**Parameters:**
- `art_id`: ID of the artwork
- `installation_type`: 'reactive', 'projection', 'kinetic', 'audio_visual'
- `interaction_method`: 'touch', 'motion', 'sound', 'proximity'
- `sensors_required`: List of required sensors (optional)
- `duration`: Installation duration (optional)
- `space_requirements`: Space requirements (optional)
- `parameters`: Additional parameters (optional)

**Returns:**
- Installation design and technical specs

### 24. Generate Art-Based 3D Models
Create 3D models from artwork.

```python
generate_art_3d(
    art_id: str,
    model_type: str = "sculpture",
    format: str = "glb",
    resolution: str = "high",
    purpose: str = "display",
    parameters: dict = None
) -> dict

**Parameters:**
- `art_id`: ID of the artwork
- `model_type`: 'sculpture', 'object', 'environment', 'character'
- `format`: Output format ('glb', 'obj', 'fbx', 'stl')
- `resolution`: 'low', 'medium', 'high', 'ultra_high'
- `purpose`: 'display', 'animation', '3d_printing', 'game_asset'
- `parameters`: Additional parameters (optional)

**Returns:**
- 3D model file and preview

### 25. Generate Art-Based Merchandise
Create product designs based on artwork.

```python
generate_art_merchandise(
    art_id: str,
    product_type: str = "tshirt",
    design_placement: str = "front",
    color_variants: list = None,
    size_variants: list = None,
    print_format: str = "digital",
    parameters: dict = None
) -> dict

**Parameters:**
- `art_id`: ID of the artwork
- `product_type`: 'tshirt', 'mug', 'poster', 'phone_case', 'tote_bag'
- `design_placement`: 'front', 'back', 'all_over'
- `color_variants`: List of colors
- `size_variants`: List of sizes
- `print_format`: 'digital', 'screen_print', 'digital_print'
- `parameters`: Additional parameters (optional)

**Returns:**
- Product mockups and print-ready files

### 26. Generate Art-Based NFTs
Create NFTs from AI-generated artwork.

```python
create_nft(
    art_id: str,
    blockchain: str = "ethereum",
    wallet_address: str,
    mint_price: float = 0.01,
    royalty_percentage: float = 10.0,
    description: str = "",
    properties: dict = {}
) -> dict

**Parameters:**
- `art_id`: ID of the artwork
- `blockchain`: Blockchain network
- `wallet_address`: Wallet address for minting
- `mint_price`: Price in cryptocurrency
- `royalty_percentage`: Royalty percentage
- `description`: NFT description
- `properties`: NFT properties metadata

**Returns:**
- NFT details and transaction hash

### 27. Generate Art-Based Stories
Create stories inspired by artwork.

```python
generate_art_story(
    art_id: str,
    story_style: str = "narrative",
    length: str = "medium",
    perspective: str = "third_person",
    tone: str = "neutral",
    parameters: dict = None
) -> dict

**Parameters:**
- `art_id`: ID of the artwork
- `story_style`: Story style ('narrative', 'poetic', 'descriptive', 'experimental')
- `length`: Story length ('short', 'medium', 'long')
- `perspective`: Narrative perspective
- `tone`: Story tone
- `parameters`: Additional parameters (optional)

**Returns:**
- Story text and audio narration (optional)

### 28. Generate Art-Based Music
Create music inspired by artwork.

```python
generate_art_music(
    art_id: str,
    music_genre: str = "ambient",
    duration: float = 180,
    mood: str = "calm",
    tempo: int = 100,
    instrumentation: list = None
) -> dict

**Parameters:**
- `art_id`: ID of the artwork
- `music_genre`: Music genre
- `duration`: Song duration in seconds
- `mood`: Musical mood
- `tempo`: Beats per minute
- `instrumentation`: List of

