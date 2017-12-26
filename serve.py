import sys, json, os

import flask
from flask import request

DIR_PATH = os.path.expanduser('~/Dropbox/diagrams')

app = flask.Flask(__name__)
port = int(sys.argv[1]) if len(sys.argv) == 2 else 80

@app.route('/')
def index():
  return flask.render_template('index.html')

@app.route('/save', methods=['POST'])
def save():
  filename = request.form['filename']
  content = request.form['content']

  path = os.path.join(DIR_PATH, filename)
  with open(path + '.json', 'w') as f:
    f.write(content)
  return 'ok'

if __name__ == '__main__':
  app.config['TEMPLATES_AUTO_RELOAD'] = True
  app.run(host='0.0.0.0', port=port, debug=(port != 80))
