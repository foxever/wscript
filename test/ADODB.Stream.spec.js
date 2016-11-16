'use strict';

var chai = require('chai'),
    path = require('path'),
    expect = chai.expect;

var getFilePath = function(filename) {
    return path.join(__dirname, '..', 'lib', filename);
}

var getNewInstance = function() {
    var instance = require(getFilePath('objects/ADODB.Stream'));
    return new instance();
}

var ADODBStream;

describe('ADODBStream', function() {
    describe('constructor()', function() {
        ADODBStream = getNewInstance();

        var properties = {
            charset: 'unicode',
            EOS: false,
            lineSeparator: -1,
            mode: 1,
            position: 0,
            size: Infinity,
            state: 0,
            type: 2,
			_data: null
        };

        it('should have all properties', function() {
            expect(ADODBStream).to.have.all.keys(Object.keys(properties));
        });

        it('should have all default values', function() {
            for (var i in properties) {
                expect(ADODBStream[i]).to.eql(properties[i]);
            }
        });
    });

    describe('default methods', function() {
        beforeEach(function() {
            ADODBStream = getNewInstance();
        });

        describe('cancel()', function() {
			it('should set State to 0', function() {
                ADODBStream.cancel();
                expect(ADODBStream.state).to.eql(0);
            });
        });

		describe('close()', function() {
			it('should set State to 0 and _data to null', function() {
                ADODBStream.close();
                expect(ADODBStream.state).to.eql(0);
				expect(ADODBStream._data).to.be.null;
            });
        });

		describe('copyTo()', function() {
			it('should throw TypeError if destStream doesn\'t exist', function() {
				expect(function() {
					ADODBStream.copyTo();
				}).to.throw(TypeError);
			});

			it('should throw TypeError if destStream is not a stream', function() {
				expect(function() {
					ADODBStream.copyTo({});
				}).to.throw(TypeError);
			});

			it('should throw TypeError if destStream is not opened', function() {
				var ADODBStream2 = getNewInstance();
				expect(function() {
					ADODBStream.copyTo(ADODBStream2);
				}).to.throw(TypeError);
			});

			it('should copy data from stream1 to stream2', function() {
				var ADODBStream1 = getNewInstance(),
					ADODBStream2 = getNewInstance();

				ADODBStream2.open();

				ADODBStream1.mode = 3;
				ADODBStream1._data = 'Hello world';
				ADODBStream1.copyTo(ADODBStream2);

				expect(ADODBStream2._data).to.equal(ADODBStream1._data);
				expect(ADODBStream2.mode).to.equal(ADODBStream1.mode);
				expect(ADODBStream2.type).to.equal(ADODBStream1.type);
			});

			it('should throw TypeError if numChars is not a number', function() {
				var ADODBStream1 = getNewInstance(),
					ADODBStream2 = getNewInstance();

				ADODBStream2.open();
				expect(function() {
					ADODBStream1.copyTo(ADODBStream2, false);
				}).to.throw(TypeError);
			});

			it('should copy n characters in data from stream1 to stream2', function() {
				var ADODBStream1 = getNewInstance(),
					ADODBStream2;

				ADODBStream1._data = 'Hello world';

				ADODBStream2 = getNewInstance();
				ADODBStream2.open();
				ADODBStream1.copyTo(ADODBStream2, 4);
				expect(ADODBStream2._data).to.equal('Hell');

				ADODBStream2 = getNewInstance();
				ADODBStream2.open();
				ADODBStream1.copyTo(ADODBStream2, -1);
				expect(ADODBStream2._data).to.equal('Hello world');

				ADODBStream2 = getNewInstance();
				ADODBStream2.open();
				ADODBStream1.copyTo(ADODBStream2, 16);
				expect(ADODBStream2._data).to.equal('Hello world');
			});
		});

		describe('flush()', function() {
			it('should set data to null', function() {
				ADODBStream._data = 'Hello world';
				ADODBStream.flush();
				expect(ADODBStream._data).to.be.null;
			});
		});

		describe('loadFromFile()', function() {

		});

		describe('open()', function() {
			it('should set State to open', function() {
				ADODBStream.open();
				expect(ADODBStream.state).to.eql(1);
			});

			it('should set Mode if provided', function() {
				ADODBStream = getNewInstance();
				ADODBStream.open(null, 2);
				expect(ADODBStream.mode).to.eql(2);
			});

			it('should throw TypeError if value is not allowed', function() {
				ADODBStream = getNewInstance();
				expect(function() {
					ADODBStream.open(null, -1);
				}).to.throw(TypeError);

				expect(function() {
					ADODBStream.open(null, 5);
				}).to.throw(TypeError);

				expect(function() {
					ADODBStream.open(null, false);
				}).to.throw(TypeError);

				expect(function() {
					ADODBStream.open(null, 'abc');
				}).to.throw(TypeError);
			});
		});

		describe('read()', function() {

		});

		describe('readText()', function() {

		});

		describe('saveToFile()', function() {

		});

		describe('setEOS()', function() {

		});

		describe('skipLine()', function() {

		});

		describe('stat()', function() {

		});

		describe('write()', function() {

		});

		describe('writeText()', function() {

		});
    });
});
