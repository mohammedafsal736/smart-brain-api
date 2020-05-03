const handleSignin = (req, res, database, bcrypt) => {
	const { email, password } = req.body;
	if(!email || !password){
		return res.status(400).json('incorrect form submission');
	}
	database.select('email','hash').from('login')
	.where('email','=', email)
	.then(data => {
		const isvalid = bcrypt.compareSync(password, data[0].hash);
		if(isvalid){
			return database.select('*').from('users')
			.where('email','=', email)
			.then(user =>{
				res.json(user[0])
			})
			.catch(err => res.status(400).json("NO USER"))
		} else {
			res.status(400).json('wrong credentials')
		}
	})
	.catch(err => res.status(400).json('wrong user input'))
}


module.exports={
	handleSignin: handleSignin
};