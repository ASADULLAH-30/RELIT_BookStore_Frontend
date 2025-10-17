function getimgurl(name) {
    return new URL(`../assets/books/${name}`, import.meta.url).href;
}

export {getimgurl};