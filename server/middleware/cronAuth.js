export const cronAuth = (req, res, next) => {
   console.log(req.headers.authorization,`Bearer ${process.env.CRON_SECRET}`);
    if(req.headers.authorization!== `Bearer ${process.env.CRON_SECRET}`){
        return res.status(400).json({message:'Unauthorized'});
    }
    next();
}