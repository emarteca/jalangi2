// do not remove the following comment
// JALANGI DO NOT INSTRUMENT

/**
 * @author  Koushik Sen
 *
 */
(function (sandbox) {
    function MyAnalysis() {

    	var indentationCount = 0;
        var cacheCount = 0;
        var cacheIndentStr = "";

        var logs = [];

        function log(str) {
            if (cacheCount !== indentationCount) {
                cacheIndentStr = "";
                for(var i=0; i<indentationCount; i++) {
                    cacheIndentStr += "    ";
                }
                cacheCount = indentationCount;
            }
            if (sandbox.Results) {
                logs.push("<li>" + cacheIndentStr.replace(/ /g, '\u00a0') +str+ " </li>");
            } else {
                console.log(cacheIndentStr + str)
            }
        }

    	function getValue(v) {
            var type = typeof v;
            if ((type === 'object' || type ==='function') && v!== null) {
                var shadowObj = sandbox.smemory.getShadowObjectOfObject(v);
                return type+"(id="+sandbox.smemory.getIDFromShadowObjectOrFrame(shadowObj)+")";
            } else {
                if (type === 'string' && v.length> MAX_STRING_LENGTH) {
                    v = v.substring(0,MAX_STRING_LENGTH)+"...";
                }
                return JSON.stringify(v);
            }
        }

        this.invokeFunPre = function (iid, f, base, args, isConstructor, isMethod, functionIid, functionSid) {
        	this.invokeFunPre = function (iid, f, base, args, isConstructor, isMethod, functionIid, functionSid) {
            var ret = "invokeFunPre(iid="+iid+", f="+getValue(f)+", base="+getValue(base);
            for(var i=0; i<args.length; i++) {
                ret += ", args["+i+"]="+getValue(args[i]);
            }
            ret += ", isConstructor="+isConstructor+", isMethod="+isMethod+", functionIid="+functionIid+", functionSid="+functionSid;
            ret += ") of function created at "+J$.iidToLocation(functionSid, functionIid);
            ret += " at " + J$.iidToLocation(J$.sid, iid);
            log(ret);
            indentationCount++;
            return {f: f, base: base, args: args, skip: false};
        };
        };
    }

    sandbox.analysis = new MyAnalysis();
}(J$));
