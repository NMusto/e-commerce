

const defaultRouter = (req,res) => {
    const { url, method } = req;
    res.status(404).send(`${url} and ${method} do not exist `);
}

export default defaultRouter;