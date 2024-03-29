/**
 * 更新日期：2019年07月23日
 * author：bigOrange
 */
(function() {
    function stopDefault(e) {
        if (e && e.preventDefault) {
            e.preventDefault()
        } else {
            window.event.returnValue = false
        }
        if (e.stopPropagation) {
            e.stopPropagation()
        } else {
            e.cancelBubble = true
        }
    }
    function clickEmptyHide(target, hideId, cb) {
        $(document).click(function(event) {
            var _con = $(target);
            if (!_con.is(event.target) && _con.has(event.target).length === 0) {
                $(hideId).hide()
            }
            if (typeof(cb) == "function") {
                cb()
            }
        })
    }
    $.fn.initWkSelect = function(option) {
        var setting = $.extend({
            data: "",
            emptyTip: "暂无数据",
            placeholder: "请选择",
            width: "300px",
            height: "30px",
            type: 1,
            inputCb: ""
        },
        option);
        var id = "#" + this.attr("id");
        var $this = this;
        $this.addClass("wkSelectBox").attr("data-wkType", setting.type);
        var data = setting.data;
        var emptyTip = setting.emptyTip;
        var width = setting.width;
        var height = setting.height;
        if ($this.html().replace(/(^\s*)|(\s*$)/g, "") != "") {
            updateList(id, data, setting.emptyTip)
        } else {
            $this.append('<input class="wkSelectInput" data-key="" style="width: ' + width + ';" placeholder="' + setting.placeholder + '"/>');
            $this.append('<ul class="wkSelectList hide"></ul>');
            $this.append('<div class="wkSelectLabel hide" style="height: ' + (parseFloat(height) - 12) + 'px"></div>');
            updateList(id, data, emptyTip);
            if (setting.type == 2) {
                $this.find(".wkSelectLabel").append('<div class="wkSelectLabelBg"><span class="wkSelectLabelText text-nowrap"></span><span class="wkSelectLabelClose">&Chi;</span></div>')
            }
            $this.find(".wkSelectList").empty().css({
                "width": $this.find(".wkSelectInput").outerWidth() + "px",
                "top": $this.find(".wkSelectInput").outerHeight() + "px"
            })
        }
        $this.wkSelectClick("", setting);
        $this.wkLabelClose();
        clickEmptyHide(id + " .wkSelectInput", id + " .wkSelectList");
        function updateList(id, data, emptyTip) {
            if ($this.find(".wkSelectInput").attr("readonly") != "readonly") {
                var html = "";
                if (data && data.length > 0) {
                    for (var i in data) {
                        html += '<li data-id="' + data[i].id + '" data-key="' + data[i].key + '">' + data[i].name + "</li>"
                    }
                } else {
                    html += '<li class="wkEmpty" data-id="" data-key="">' + emptyTip + "</li>"
                }
                $this.find(".wkSelectList").empty().append(html)
            }
        }
    };
    $.fn.updateWkSelectList = function(data, emptyTip, cb) {
        var $this = this;
        emptyTip = emptyTip ? emptyTip: "暂无数据";
        if ($this.find(".wkSelectInput").attr("readonly") != "readonly") {
            var html = "";
            if (data && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    html += '<li data-id="' + data[i].id + '" data-key="' + data[i].key + '">' + data[i].name + "</li>"
                }
            } else {
                html += '<li class="wkEmpty" data-id="" data-key="">' + emptyTip + "</li>"
            }
            $this.find(".wkSelectList").html(html).show();
            if (typeof(cb) == "function") {
                cb()
            }
        }
    };
    $.fn.setDefaultInput = function(data, type, readonly) {
        var $this = this;
        type = type ? type: $this.attr("data-wkType");
        $this.find(".wkSelectInput").val(data.name).attr("data-key", data.key).attr("data-id", data.id);
        if (type == 2) {
            $this.find(".wkSelectLabel").show();
            $this.find(".wkSelectLabelText").text(data.name);
            $this.find(".wkSelectInput").attr("readonly", "readonly")
        }
        if (readonly == "readonly" || readonly === true) {
            $this.find(".wkSelectInput").attr("readonly", "readonly")
        }
    };
    $.fn.getWkVal = function() {
        return this.find(".wkSelectInput").val()
    };
    $.fn.getWkId = function() {
        return this.find(".wkSelectInput").attr("data-id")
    };
    $.fn.getWkKey = function() {
        return this.find(".wkSelectInput").attr("data-key")
    };
    $.fn.isChooseWkItem = function() {
        if (this.find(".wkSelectInput").attr("readonly") != "readonly") {
            return false
        } else {
            return true
        }
    };
    $.fn.wkInputClick = function(cb) {
        this.delegate(".wkSelectInput", "click",
        function(e) {
            if (typeof(cb) == "function") {
                cb(e)
            }
        })
    };
    $.fn.wkInputKeyup = function(cb) {
        this.delegate(".wkSelectInput", "keyup",
        function(e) {
            if (typeof(cb) == "function") {
                cb(e)
            }
        })
    };
    $.fn.wkInputClickMul = function(cb) {
        this.wkInputKeyup(cb);
        this.wkInputClick(cb)
    };
    $.fn.wkSelectClick = function(cb, setting) {
        var $this = this;
        $this.find("ul.wkSelectList").delegate("li", "click",
        function(e) {
            var $input = $this.find(".wkSelectInput");
            var type = $this.attr("data-wkType");
            stopDefault(e);
            if ($(this).hasClass("wkEmpty")) {
                return
            }
            $this.find(".wkSelectList").hide();
            $input.attr("data-key", $(this).data("key")).attr("data-id", $(this).data("id")).val($(this).text());
            if (type == 2) {
                $this.find(".wkSelectLabel").show();
                $this.find(".wkSelectLabelText").text($(this).text());
                $input.attr("readonly", "readonly")
            } else {
                if (type == 1) {
                    if (setting && (setting.readonly == "readonly" || setting.readonly === true)) {
                        $input.attr("readonly", "readonly")
                    }
                }
            }
            $this.find(".wkSelectLabelText").css("width", "auto");
            if ($this.find(".wkSelectLabelText").width() > ($input.width())) {
                $this.find(".wkSelectLabelText").width($input.width() - $this.find(".wkSelectLabelClose").outerWidth())
            }
            if (typeof(cb) == "function") {
                cb(e)
            }
        })
    };
    $.fn.wkLabelClose = function(cb) {
        var $this = this;
        $this.delegate(".wkSelectLabelClose", "click",
        function(e) {
            $this.find(".wkSelectLabel").hide();
            $this.find(".wkSelectLabelText").text("");
            $this.find(".wkSelectInput").removeAttr("readonly").val("");
            if (typeof(cb) == "function") {
                cb(e)
            }
        })
    }
} (jQuery));