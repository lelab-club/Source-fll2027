(function ($) {
    var futurX = 120, futurY = 142;

    function parseCSV(text) {
        var lines = text.trim().split('\n');
        var headers = lines[0].split(',');
        var rows = [];
        for (var i = 1; i < lines.length; i++) {
            var line = lines[i];
            var fields = [];
            var current = '', inQuote = false;
            for (var c = 0; c < line.length; c++) {
                var ch = line[c];
                if (ch === '"') {
                    inQuote = !inQuote;
                } else if (ch === ',' && !inQuote) {
                    fields.push(current);
                    current = '';
                } else {
                    current += ch;
                }
            }
            fields.push(current);
            var row = {};
            for (var h = 0; h < headers.length; h++) {
                row[headers[h].trim()] = fields[h] ? fields[h].trim() : '';
            }
            rows.push(row);
        }
        return rows;
    }

    function renderItem(row) {
        var typeClass = row.type === 'national' ? ' national' : '';
        var link = row.website
            ? '<a class="td-organizer-item-link" href="' + $('<span>').text(row.website).html() + '" target="_blank">Site Internet</a>'
            : '';
        return '<div class="td-organizer-item' + typeClass + '" data-organizer="' + row.id + '">'
            + '<div class="td-organizer-item-icon">'
            + '<img src="' + row.image + '" alt="">'
            + '</div>'
            + '<div class="td-organizer-item-text">'
            + '<h4 class="td-organizer-item-title">' + row.name + '</h4>'
            + '<p class="td-organizer-item-subtitle">' + row.location + '</p>'
            + link
            + '</div>'
            + '</div>';
    }

    function renderPin(row) {
        if (!row.cx) return '';
        var cx = +row.cx, cy = +row.cy;
        var typeClass = row.type === 'national' ? ' td-organizer-pin-national' : '';
        return '<g class="td-organizer-pin' + typeClass + '" data-organizer="' + row.id + '" style="cursor: pointer;">'
            + '<circle cx="' + cx + '" cy="' + cy + '" r="6" fill="' + (row.type === 'national' ? '#2979ff' : '#e74c3c') + '" stroke="#fff" stroke-width="2" />'
            + '<circle cx="' + cx + '" cy="' + cy + '" r="12" fill="transparent" />'
            + '</g>';
    }

    function renderLine(row) {
        if (!row.cx) return '';
        var cx = +row.cx, cy = +row.cy;
        var mx = (cx + futurX) / 2, my = (cy + futurY) / 2 - 12;
        return '<path d="M' + cx + ',' + cy + ' Q' + mx + ',' + my + ' ' + futurX + ',' + futurY + '" fill="none" stroke="#00000055" stroke-width="1" stroke-dasharray="5,4" />';
    }

    function bindHighlights() {
        $(document).on('mouseenter', '.td-organizer-item, .td-organizer-pin', function () {
            var id = $(this).data('organizer');
            $('.td-organizer-item.highlight, .td-organizer-pin.highlight').removeClass('highlight');
            $('.td-organizer-pin[data-organizer="' + id + '"]').each(function () {
                var parent = this.parentNode;
                if (parent) parent.appendChild(this);
            });
            $('.td-organizer-item[data-organizer="' + id + '"]').addClass('highlight');
            $('.td-organizer-pin[data-organizer="' + id + '"]').addClass('highlight');
            var $item = $('.td-organizer-item[data-organizer="' + id + '"]').first();
            if ($item.length) $item[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }).on('mouseleave', '.td-organizer-item, .td-organizer-pin', function () {
            $('.td-organizer-item.highlight, .td-organizer-pin.highlight').removeClass('highlight');
        });
    }

    function updateListMask() {
        var list = $('.td-organizers-list')[0];
        if (!list) return;
        var sh = list.scrollHeight, ch = list.clientHeight, st = list.scrollTop;
        if (sh <= ch) {
            list.style.maskImage = 'none';
            list.style.webkitMaskImage = 'none';
            return;
        }
        var atTop = st <= 2, atBottom = sh - ch - st <= 2;
        var mask;
        if (atTop) {
            mask = 'linear-gradient(to bottom, #000 0, #000 calc(100% - 20px), transparent 100%)';
        } else if (atBottom) {
            mask = 'linear-gradient(to bottom, transparent 0, #000 20px, #000 100%)';
        } else {
            mask = 'linear-gradient(to bottom, transparent 0, #000 20px, #000 calc(100% - 20px), transparent 100%)';
        }
        list.style.maskImage = mask;
        list.style.webkitMaskImage = mask;
    }

    $.get($('.td-organizers-wrap').data('csv-url'), function (csv) {
        var rows = parseCSV(csv);

        var seen = {};
        var primaryRows = [];
        var pinRows = [];
        rows.forEach(function (row) {
            if (row.name && !seen[row.id]) {
                seen[row.id] = true;
                primaryRows.push(row);
            }
            if (row.cx) {
                pinRows.push(row);
            }
        });

        var national = primaryRows.filter(function (row) { return row.type === 'national'; });
        var local = primaryRows.filter(function (row) { return row.type !== 'national'; })
            .sort(function (a, b) { return (+a.cy || 9999) - (+b.cy || 9999); });

        var linesHtml = '';
        national.forEach(function (row) { linesHtml += renderLine(row); });
        $('#organizers-lines').html(linesHtml);

        var pinsHtml = '';
        pinRows.forEach(function (row) { pinsHtml += renderPin(row); });
        $('#organizers-pins').html(pinsHtml);

        var listHtml = '<div class="td-organizers-section-title">Organisateurs du Festival 2027</div>';
        national.forEach(function (row) { listHtml += renderItem(row); });
        listHtml += '<div class="td-organizers-section-title">Organisateurs Locaux</div>';
        local.forEach(function (row) { listHtml += renderItem(row); });
        $('.td-organizers-list-items').html(listHtml);

        $('#organizers-list-content').show();
        $('#organizers-loading').hide();

        bindHighlights();
        updateListMask();
        $('.td-organizers-list').on('scroll', updateListMask);
        $(window).on('resize', updateListMask);
    });
})(jQuery);
