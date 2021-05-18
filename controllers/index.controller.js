const indexGet = (req, res) => {
    const pageTitle = 'Handlebars Handlebars Handlebars';
    return res.render('index', { title: pageTitle, user: req.user });
};

module.exports = { indexGet };