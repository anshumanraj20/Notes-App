from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)

# Secret key for session management
app.secret_key = 'supersecretkey'  # Replace with a real secret key in production

# Hardcoded credentials
HARDCODED_USERNAME = "admin"
HARDCODED_PASSWORD = "password"

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username == HARDCODED_USERNAME and password == HARDCODED_PASSWORD:
            session['logged_in'] = True  # Set session variable
            return redirect(url_for('dashboard'))
        else:
            error = "Invalid credentials. Please try again."
    return render_template('login.html', error=error)

@app.route('/dashboard')
def dashboard():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    return render_template('dashboard.html') 

@app.route('/logout')
def logout():
    session.pop('logged_in', None)  # Clear the session variable
    return redirect(url_for('login')) # Redirect to login page

if __name__ == '__main__':
    app.run(debug=True)
