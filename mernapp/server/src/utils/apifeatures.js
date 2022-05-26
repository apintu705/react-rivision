class Apifeatures{
    constructor(query,querystring){
        this.query = query;
        this.querystring = querystring;
    }

    search(){
        const keywords = this.querystring.keywords?{
            name:{$regex:this.querystring.keywords,
            $options:"i"}
        }:{}
        this.query=this.query.find({...keywords});
        return this;
    }


    filter(){
        const message={...this.querystring}
        // for category
        const removef=["keywords","page","limit"];
        removef.forEach(key=>delete message[key]);
        
        // for price and rating
        
        let maq=JSON.stringify(message);
        maq=maq.replace(/\b(gt|gte|lt|lte)\b/gi,(key)=>`$${key}`);
        
        this.query=this.query.find(JSON.parse(maq));
        return this;
    }


    pagination(perpage){
        const currentpage=Number(this.querystring.page)||1;
        const skip=perpage*(currentpage-1);

        this.query=this.query.limit(perpage).skip(skip);
        return this;

    }
}

module.exports = Apifeatures;