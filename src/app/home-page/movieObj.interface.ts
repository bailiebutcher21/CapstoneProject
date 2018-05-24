export interface MovieObj {
    title: string;
    description: string;
    image: {
        url: string;
        poster_ref: string;
        description: string;
    };
    public_rating: number;
    app_rating: number;
    fireId: string;
}
